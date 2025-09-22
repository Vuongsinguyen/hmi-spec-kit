cmake_minimum_required(VERSION 3.10)
project(hmi_backend)

set(CMAKE_CXX_STANDARD 17)

# Crow (header-only)
include_directories(${CMAKE_SOURCE_DIR}/crow/include)

# nlohmann/json (header-only)
include_directories(${CMAKE_SOURCE_DIR}/json/include)

add_executable(hmi_backend main.cpp)