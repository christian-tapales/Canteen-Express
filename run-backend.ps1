# Script to run the backend and capture full output
cd "c:\Users\vinci_qep9bts\Documents\GitHub\Canteen-Express\canteen-express-backend"
./mvnw.cmd spring-boot:run 2>&1 | Tee-Object -FilePath "backend-log.txt"
