# pennapps-main

Insert usage info here

TODO: put the below steps into an easy script

## Building and Deploying the Site
###### To build the site, first run `npm run build`.
This generates minimied and production-optimized output in `/build`.

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
