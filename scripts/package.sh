#!/bin/bash

packagefn=$(scripts/build_zip.sh)
stat=$(git status 2> /dev/null | tail -n1)
if [ "nothing to commit (working directory clean)" != "$stat" ]; then
    echo "Unclean - please commit before package.sh";
    exit 2;
fi
git read-tree --prefix=gh-pages/ -u gh-pages
cp -r "$packagefn" gh-pages/releases
git add -f gh-pages
tree=$(git write-tree --prefix=gh-pages/) && commit=$(echo \"Generated docs\" | git commit-tree $tree -p gh-pages) && git update-ref refs/heads/gh-pages $commit && git reset HEAD
if [ -d gh-pages ]; then rm -r gh-pages; fi
echo "Committed tree ${tree} containing ${packagefn} into gh-pages/release"

