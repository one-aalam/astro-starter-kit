# Welcome to [Astro](https://astro.build)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   ├── robots.txt
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── Tour.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command         | Action                                      |
|:----------------|:--------------------------------------------|
| `npm install`   | Installs dependencies                       |
| `npm run start` | Starts local dev server at `localhost:3000` |
| `npm run build` | Build your production site to `./dist/`     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://github.com/snowpackjs/astro) or jump into our [Discord server](https://astro.build/chat).

Minimum supported version of Node is -> `14.15.1`

Sharpen our Tools - Configure TailwindCSS

Let's make sense of the TailwindCSS config.
```json
export default {
  // projectRoot: '.',     // Where to resolve all URLs relative to. Useful if you have a monorepo project.
  // pages: './src/pages',   // Path to Astro components, pages, and data
  // dist: './dist',       // When running `astro build`, path to final static output
  // public: './public',   // A folder of static files Astro will copy to the root. Useful for favicons, images, and other files that don’t need processing.
  buildOptions: {
    // site: 'http://example.com',           // Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
    // sitemap: true,      // Generate sitemap (set to "false" to disable)
  },
  devOptions: {
    // port: 3000,         // The port to run the dev server on.
    // tailwindConfig: '', // Path to tailwind.config.js if used, e.g. './tailwind.config.js'
  },
};
```
Most of the settings are sane defaults, that makes sense for a FE project. One thing to note here is that the `projectRoot` doesn't necessarily needs to be the root directory, and it will come handy if you're maintainng multiple sub-packages under one repository in Github(monorepo).
TailwindCSS is supported out of the box, which means you don't need to install `PostCSS` or `auto-prefixer`.
```bash
yarn add --dev tailwindcss@latest
```
With that done, let's configure TailwindCSS, with JIT mode for superfast tailwindCSS authoring experience
```js|tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{astro,js,ts}'],
};
```
Let's make TailwindCSS scan all the `.astro` and `.js`, `.ts` files for now!
Uncomment or apply the following changes in `tailwind.config.mjs` and restart the app
```js
  // other config
  devOptions: {
    tailwindConfig: './tailwind.config.js',
  }
```
> reloads don't work that reliably, Zen mode and extensions might not work correctly. I'd reccomend to change the language mode to HTML to get the extensions like Zen, auto-complete to work
One thing to note about Astro is SCSS is supported out of the box. Just put an SCSS file and link it to your HTML

Open   `public/style/global.css` and put the following
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
to import TailwindCSS in our project

With the TailwindCSS in place let's add some tailwindCSS sprinkled mark-up,
```html
<body class="font-sans antialiased">
    <main class="w-full h-screen mx-auto relative px-2 sm:px-6 lg:px-8">
        <br class="my-4"/>
        <header class="w-full flex flex-col align-middle items-center bg-green-100 p-8 rounded-md shadow-sm">
            <img width="60" height="80" src="/assets/logo.svg" alt="Astro logo">
            <h1>Welcome to <a class="font-semibold" href="https://astro.build/">Astro</a>&nbsp;<small class="inline-block px-2 py-1 bg-green-500 text-white rounded-sm uppercase">Note</small></h1>
        </header>
        <div class="container">
            <!-- rest of the content goes here... -->
        </div>
    </main>
</body>
```

tags, remove some non-needed components and commit or changes

Full-markup for `index.astro` should look like
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Astro - Note</title>
    <meta name="description" content="Fast websites with less Javascript!"/>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="shortcut icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta httpEquiv="X-UA-Compatible" content="IE=edge"  />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="msapplication-config" content="/browserconfig.xml"/>
    <meta name="theme-color" content="#ffffff" />

    <!-- Link to the global style, or the file that imports TailwindCSS constructs -->
    <link rel="stylesheet" href="/style/global.css">
</head>
<body class="font-sans antialiased">
    <main class="w-full h-screen mx-auto relative px-2 sm:px-6 lg:px-8">
        <br class="my-4"/>
        <header class="w-full flex flex-col align-middle items-center bg-green-100 p-8 rounded-md shadow-sm">
            <img width="60" height="80" src="/assets/logo.svg" alt="Astro logo">
            <h1>Welcome to <a class="font-semibold" href="https://astro.build/">Astro</a>&nbsp;<small class="inline-block px-2 py-1 bg-green-500 text-white rounded-sm uppercase">Note</small></h1>
        </header>
        <div class="container">
            <!-- rest of the content goes here... -->
        </div>
    </main>
</body>
</html>


Picture Source: https://icons8.com/illustrations/illustration/pixeltrue-special-deals-1

```

Since the target sites built with SSGs tend to be content-heavy let's go ahead and install few of the TailwindCSS plugins like
`@tailwindcss/typography` - to quicky add sensible typographic styles to content coming from external sources like Markdown or a CMS
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Astro - Note</title>
    <meta name="description" content="Fast websites with less Javascript!"/>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="shortcut icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta httpEquiv="X-UA-Compatible" content="IE=edge"  />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="msapplication-config" content="/browserconfig.xml"/>
    <meta name="theme-color" content="#ffffff" />

    <!-- Link to the global style, or the file that imports TailwindCSS constructs -->
    <link rel="stylesheet" href="/style/global.css">
</head>
<body class="font-sans antialiased">
    <main class="w-full h-screen mx-auto relative px-2 sm:px-6 lg:px-8">
        <br class="my-4"/>
        <header class="w-full flex flex-col align-middle items-center bg-green-100 p-8 rounded-md shadow-sm">
            <img width="60" height="80" src="/assets/logo.svg" alt="Astro logo">
            <h1>Welcome to <a class="font-semibold" href="https://astro.build/">Astro</a>&nbsp;<small class="inline-block px-2 py-1 bg-green-500 text-white rounded-sm uppercase">Note</small></h1>
        </header>
        <div class="container">
            <!-- rest of the content goes here... -->
            <br class="my-4"/>
            <article class="mx-auto prose lg:prose-xl">
                <h1>Introducing Astro: Ship Less JavaScript</h1>
                <p class="line-clamp-2 md:line-clamp-none">
                    For years parents have espoused the health benefits of eating garlic bread with cheese to their
                    children, with the food earning such an iconic status in our culture that kids will often dress
                    up as warm, cheesy loaf for Halloween.
                </p>
                <p>
                    But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases
                    springing up around the country.
                </p>
                <div class="aspect-w-16 aspect-h-9">
                    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <!-- ... -->
            </article>
        </div>
    </main>
</body>
</html>
```
