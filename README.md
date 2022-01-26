# Node Docker

### Build Docker Image
```bash
docker build -t node-app-image .
```

### Run Docker Container
- `-d`: detach container from the root process (CLI) running it.
- `-v`: shared filesystems between local environment and container, `:ro` read only.
- `-p`: map TCP port in the container to port on the Docker host.
```bash
[Windows CMD] docker run -v %cd%:/app:ro -v /app/node_modules -p 3000:3000 -d --name node-app node-app-image
[Windows PS] docker run -v ${pwd}:/app:ro -v /app/node_modules -p 3000:3000 -d --name node-app node-app-image
[Linux/Mac] docker run -v $(pwd):/app:ro -v /app/node_modules -p 3000:3000 -d --name node-app node-app-image
```