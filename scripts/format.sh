cd frontend && npm run format
cd ../backend && npm run format

cd ..
files=$(git diff --name-only --cached --diff-filter=d)
if [ -n "$files" ]; then
  echo "$files" | while IFS= read -r file; do
    git add "$file"
  done
  echo "Fichiers ajoutés."
else
  echo "Aucun fichier à ajouter."
fi