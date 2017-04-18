# pennapps-main

Do not update the code in this repository unless you really know what you're doing. Only submit a Pull Request, do not commit directly.

To update information, submit a Pull Request to one of the files in teh `/data` folder. You may update the following files:

- `currentEvent.json`: This will update the text relating to the current event on the splash page. Set the `siteLink` to `#` if you set the text on the button to "Coming Soon" and you don't want the link to go anywhere in particular.
- `events.json`: When adding an event to the history and timeline, you *MUST* update this. Please specify all fields. `longHTML` will render as HTML so you can include inline links using `<a>` tags.
- `linksList.json`: When adding an event to the history and timeline, you *MUST* update this. Please include all links to Press articles in this as an array. The key must be of the form `[year][s|f]`. After updating this file, run `npm run scrape` to scrape content from teh links you just added and add them to `links.json`.
- `links.json`: The results of running the scraper are added to this file. When adding an event to the history and timeline, you *MUST* at least check this file, and will likely have to add some data for any linked sites that do not provide good information when scraped. For any of these, please manually visit those sites and add the `title`, `site`, `description`, and `image | url` fields to this file within the already created objects.
- `organizers.json`: When adding an event to the history and timeline, you *MUST* update this. Please follow the data format listed and add the new oragnizers *at the end of this file*. Please include *at least* the following fields: `name`, `image`, `events`. Remember to look for an existing object for a user before creating a new one. the `events` object expects keys to be of the exact same form as listed in `linksList.json`, ie, `[year][s|f]`, and the value to be the title (usually "Board", "Vice-Director" or "Director").

## Building and Deploying the Site
###### To build the site, run `npm run build`. It performs the below steps.
Run `react-scripts build`. This generates minimied and production-optimized output in `/build`.

Add a `CNAME` file to `/build`, since rebuilding removes it, and we need to be in the top of `gh-pages`, which only contains the `/build` subdirectory:

```
echo "pennapps.com" > build/CNAME
git add build/CNAME
```

Add files from src, public, or build as required, then commit the build and these new changes:

 ```
 git add src public build
 git commit -am "[Your description of changes]"
 ```

Switch to gh-pages, force-add the file to the working copy:

```
git checkout -B gh-pages
git add -f build
```

Add to commit and filter out build subdirectory:

```
git commit -am "Rebuild"
git filter-branch -f --prune-empty --subdirectory-filter build
```

Force push, return to master, and push built changes to master:

```
git push -f origin gh-pages
git checkout -
git push origin master
```
