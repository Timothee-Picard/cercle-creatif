cd frontend && npm run test:ci
frontend_exit_code=$?

cd ../backend && npm run test:ci
backend_exit_code=$?

if [ $frontend_exit_code -ne 0 ] || [ $backend_exit_code -ne 0 ]; then
  echo "Les tests ont échoué, commit annulé."
  exit 1
fi

echo "Les tests sont réussis, commit autorisé."
exit 0
