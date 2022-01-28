# Node Docker
Learning Docker, courtesy of [freeCodeCamp](https://www.youtube.com/watch?v=9zUHg7xjIqQ).

## 1. Managing Individual Containers
### Build Image
```bash
docker build -t node-app-image .
```

### Run Container
- `-d`: detach container from the root process (CLI) running it.
- `-v`: shared filesystems between local environment and container, `:ro` read only.
- `-p`: map Docker host port to TCP port in the Docker container.
```bash
[Windows CMD] docker run -v %cd%:/app:ro -v /app/node_modules --env-file ./.env -p 3000:4000 -d --name node-app node-app-image
[Windows PS] docker run -v ${pwd}:/app:ro -v /app/node_modules --env-file ./.env -p 3000:4000 -d --name node-app node-app-image
[Linux/Mac] docker run -v $(pwd):/app:ro -v /app/node_modules -p 3000:4000 -d --name node-app node-app-image
```

### Remove Container
```bash
docker rm node-app -fv
```

## 2. Managing Multiple Containers
### Build Image & Run Containers
Use a YAML file to configure an application’s services. Then, with a single command, create and start all the services from the configuration. 
- `--build`: force build images before starting containers
```bash
[Development] docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
[Production] docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

### Remove Containers
```bash
docker-compose down -v
```

## 3. Docker Concepts
### Image Layers & Caching
Each Dockerfile command is an image layer. Docker caches image layers and rebuilds layers that have experienced changes.

### Port Accessibility
Dockerfile `EXPOSE` allows inter-container communication, `docker run -p` makes the service in the container accessible from anywhere, even outside Docker.