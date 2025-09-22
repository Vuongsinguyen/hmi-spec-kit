cmake_minimum_required(VERSION 3.10)
project(hmi_backend)

set(CMAKE_CXX_STANDARD 17)

# ASIO (dependency for Crow)
include_directories(/opt/homebrew/Cellar/asio/1.36.0/include)

# Crow (header-only)
include_directories(${CMAKE_SOURCE_DIR}/crow/include/Crow-1.2.1.2/include)

# nlohmann/json (header-only)
include_directories(${CMAKE_SOURCE_DIR}/json/json-3.12.0/include)

add_executable(hmi_backend main.cpp)