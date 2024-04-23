
> 23 April 2024.

# shadcn fresh attempt

i really want to get shadcn working on fresh.
i'm going to document my progress here, showing
each step i took

## compatibility

fresh uses preact which is sort-of like react,
i.e. mostly compatible? so it should work, since
shadcn is react based ... not sure how they differ,
though.

however, there is no official way to do it. shadcn
does have a manual installation page
https://ui.shadcn.com/docs/installation/manual
but it's all based on a typical react-like stack ...

## what to know

### tailwind

shacn uses tailwind. that is easily integrated into
fresh, in fact the default fresh install (as of april 2024)
has a standard tailwind install with a normal `tailwind.config.ts`
inside of it.

## prior work

i'm going to start using some github repos that have done
the same.

### netzo

the primary one is netzo https://github.com/netzo/netzo
which does exactly what i'm trying to do, except with
a bunch of other stuff. see this discord comment, presumably
from the authors https://discord.com/channels/684898665143206084/991511118524715139/1193993346608275497

however, take a look at this code from the netzo repo,
called `alert-dialog.tsx`:

```tsx
// @deno-types="npm:@types/react@18.2.60"
import * as React from "react";

import * as AlertDialogPrimitive from "../deps/@radix-ui/react-alert-dialog.ts";
import { buttonVariants } from "./button.tsx";
import { cn } from "./utils.ts";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className,
    )}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
```

there is a ton of stuff i don't get here:

1. what is `React.forwardRef` ?
2. why does everything have `React.ElementRef` and `React.ComponentPropsWithoutRef` ?

> i should note, i don't use react at work, it's mainly svelte

## understanding shadcn

the other thing to note is what shadcn claims to be: a
library where you have components you can simply drop
into your project ... it's not an all-in kind of thing ...

## steps

ok, i'm going to record each step i take here.

### 1. fresh install

i just ran `deno run -A -r https://fresh.deno.dev` as
per the fresh docs.

to run you just go `deno task start`

### 2. alert-dialog.tsx

ok, this is going to be pain-stakingly detailed.

first i copied the `alert-dialog.tsx` above into
`/islands/alert-dialog.tsx` (still not sure which
code goes into islands and which goes into
components...).

then i imported it in `index.tsx` with:

```tsx
import { AlertDialog } from '../islands/alert-dialog.tsx';
```

and then tried to use it with

```tsx
<AlertDialog />
```

and now with `deno task start` i get:

```
error: Uncaught (in promise) TypeError: Relative import path "react" not prefixed with / or ./ or ../ and not in import map from "file:///Users/karl/shadcn-fresh/islands/alert-dialog.tsx"
    at file:///Users/karl/shadcn-fresh/islands/alert-dialog.tsx:2:24
  const manifest = (await import(toFileUrl(join(dir, "fresh.gen.ts")).href))
                    ^
    at async dev (https://deno.land/x/fresh@1.6.8/src/dev/dev_command.ts:38:21)
    at async file:///Users/karl/shadcn-fresh/dev.ts:8:1
```

no idea what it means ... it's coming from line 2 of `alert-dialog.tsx`:

```tsx
import * as React from "react";
```

### 3. react and deno.json

ok so netzo declares an import for react in their `deno.jsonc`
(no idea if ... you can use jsonc normally ...) and i noticed that
the fresh install doesn't declare one, just preact ... so let's
add it:

```
"react": "https://esm.sh/preact@10.20.0/compat"
```

> no idea if i also need `react-dom` but let's see

ok now after `deno task start` i get:

```
error: Uncaught (in promise) TypeError: Module not found "file:///Users/karl/shadcn-fresh/deps/@radix-ui/react-alert-dialog.ts".
    at file:///Users/karl/shadcn-fresh/islands/alert-dialog.tsx:4:39
  const manifest = (await import(toFileUrl(join(dir, "fresh.gen.ts")).href))
                    ^
    at async dev (https://deno.land/x/fresh@1.6.8/src/dev/dev_command.ts:38:21)
    at async file:///Users/karl/shadcn-fresh/dev.ts:8:1
```

hmmm ...

ok, weirdly i noticed this before: netzo has a `deps` folder with ... really
just a bunch of one-line files all with imports. so for example the one in
the error message (`deps/@radix-ui/react-alert-dialog.ts`) looks like this:

```ts
export * from "https://esm.sh/@radix-ui/react-alert-dialog@1.0.4?external=react,react-dom&target=es2022";
```

hmmm ... does that work? ok, let's add it ...

ok, it did work - it downloaded the library ... and now a react-dom error:

```
error: Uncaught (in promise) TypeError: Relative import path "react-dom" not prefixed with / or ./ or ../ and not in import map from "https://esm.sh/v135/@radix-ui/react-portal@1.0.3/X-ZS9yZWFjdCxyZWFjdC1kb20/es2022/react-portal.mjs"
    at https://esm.sh/v135/@radix-ui/react-portal@1.0.3/X-ZS9yZWFjdCxyZWFjdC1kb20/es2022/react-portal.mjs:2:167
  const manifest = (await import(toFileUrl(join(dir, "fresh.gen.ts")).href))
                    ^
    at async dev (https://deno.land/x/fresh@1.6.8/src/dev/dev_command.ts:38:21)
    at async file:///Users/karl/shadcn-fresh/dev.ts:8:1
```

adding it to our `deno.json` as per netzo:

```
"react-dom": "https://esm.sh/preact@10.20.0/compat",
```

and now:

```
error: Uncaught (in promise) TypeError: Module not found "file:///Users/karl/shadcn-fresh/islands/button.tsx".
    at file:///Users/karl/shadcn-fresh/islands/alert-dialog.tsx:5:32
  const manifest = (await import(toFileUrl(join(dir, "fresh.gen.ts")).href))
                    ^
    at async dev (https://deno.land/x/fresh@1.6.8/src/dev/dev_command.ts:38:21)
    at async file:///Users/karl/shadcn-fresh/dev.ts:8:1
```

ok right - those files i need to create.

here is `button.tsx`

```tsx
// @deno-types="npm:@types/react@18.2.60"
import * as React from "react";

import { IS_BROWSER } from "$fresh/runtime.ts";
import { Slot } from "../deps/@radix-ui/react-slot.ts";
import { cva, type VariantProps } from "../deps/class-variance-authority.ts";
import { cn } from "./utils.ts";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-opacity-90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-opacity-90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary-80",
        ghost: "bg-inherit hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-xl font-semibold",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={IS_BROWSER ? !!props.disabled : true}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

some more deps to add. and it also uses `utils.ts`:

```ts
// unocss might have twMerge alternative soon
// see https://github.com/unocss/unocss/issues/2748
import { type ClassValue, clsx } from "../deps/clsx.ts";
import { createTwc } from "../deps/react-twc.ts";
import { twMerge } from "../deps/tailwind-merge.ts";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const twx = createTwc({ compose: cn });
```

ok adding all those deps as well ...

ok, it runs ... but now

```
An error occurred during route handling or page rendering.
TypeError: Cannot read properties of undefined (reading '__H')
    at l (https://esm.sh/stable/preact@10.20.0/denonext/hooks.js:2:205)
    at T (https://esm.sh/stable/preact@10.20.0/denonext/hooks.js:2:1470)
    at https://esm.sh/v135/@radix-ui/react-context@1.0.1/X-ZS9yZWFjdCxyZWFjdC1kb20/es2022/react-context.mjs:2:819
    at Object.T (https://esm.sh/v135/@radix-ui/react-alert-dialog@1.0.4/X-ZS9yZWFjdCxyZWFjdC1kb20/es2022/react-alert-dialog.mjs:2:988)
    at m (https://esm.sh/v135/preact-render-to-string@6.3.1/X-ZS8q/denonext/preact-render-to-string.mjs:2:3237)
    at m (https://esm.sh/v135/preact-render-to-string@6.3.1/X-ZS8q/denonext/preact-render-to-string.mjs:2:2543)
    at m (https://esm.sh/v135/preact-render-to-string@6.3.1/X-ZS8q/denonext/preact-render-to-string.mjs:2:3802)
    at m (https://esm.sh/v135/preact-render-to-string@6.3.1/X-ZS8q/denonext/preact-render-to-string.mjs:2:2543)
    at m (https://esm.sh/v135/preact-render-to-string@6.3.1/X-ZS8q/denonext/preact-render-to-string.mjs:2:5050)
    at m (https://esm.sh/v135/preact-render-to-string@6.3.1/X-ZS8q/denonext/preact-render-to-string.mjs:2:3802)
```

... apparently it's ... because of ... a duplicate preact ... thingy?

https://discord.com/channels/684898665143206084/991511118524715139/1228617857655640194

### 4. jsx-import-source

ok turns out ... there is a note in netzo's `deno.jsonc` (a comment! hence
the jsonc ... i'm renaming out json to jsonc...) about ... i dunno, something
like this:

```
"compilerOptions": {
    "jsx": "react-jsx",
    // NOTE: alias "preact" is not being resolved for deno.json(c) of monorepo
    // therefore we use react here (this is not needed withing the individual
    // projects e.g. under templates/crm/deno.json, since "preact" resolves properly)
    // see https://github.com/denoland/deno/issues/20582#issuecomment-1751454928
    "jsxImportSource": "https://esm.sh/react@18.2.0"
  },
```

sounds like .. i dunno. netzo is ... used as an import for other projects,
i dunno ...

i added it and ... the error went away, but - now nothing happens
when i go to `localhost:8000`. it's empty - no html, no errors ...

...

ok, this seems to have fixed it:

```
"jsxImportSource": "https://esm.sh/preact@10.20.0"
```

no idea why...

now it renders but i don't see anything. i'm not using the dialog properly.

### 5. AlertDialog

here is the code from the chadcn alert-dialog docs https://ui.shadcn.com/docs/components/alert-dialog

```tsx
<AlertDialog>
  <AlertDialogTrigger>Open</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

pasting that in i get:

> `DialogTitle` must be used within `Dialog`

turns out ... it happens in other frameworks: https://github.com/shadcn-ui/ui/issues/2249

...

ok, so ... i moved all the code into `components` ...
and then made my own special component called `MyAlert.tsx`
inside of `islands` ... and it seems to work ...
except without any css, it seems ...

no errors. calling this a win.

no idea why ... it has to go this way.