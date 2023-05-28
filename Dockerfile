# Sử dụng node:alpine làm base image
FROM node:alpine

# Set Working Directory
WORKDIR /app

# Copy package.json và yarn.lock (nếu có) vào working directory
COPY package.json yarn.lock* ./

# Run command "yarn install" để cài đặt các dependencies
RUN yarn install --production --no-progress

# Copy các file và thư mục khác vào working directory của image
COPY . /app

# Kiểm tra xem ứng dụng của chúng ta có hoạt động không bằng cách chạy command "yarn build"
RUN yarn run build

# Set environment variable để chạy ứng dụng React-app trên cổng 3000
ENV PORT=3000

# Expose cổng 3000
EXPOSE 3000

# Sử dụng command "yarn start" để chạy ứng dụng khi container được tạo
CMD ["yarn", "start"]
