cd /app & npm run start:dev &
P1=$!
cd /app/survey && python3 /app/survey/api.py &
P2=$!
wait $P1 $P2