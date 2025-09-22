// Simple C++ REST API backend using Crow
#include "crow.h"
#include <fstream>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

json load_roles() {
    try {
        std::ifstream f("../config/roles.json");
        if (!f) {
            std::cerr << "Could not open roles.json" << std::endl;
            return json{{"roles", json::array()}};
        }
        json data;
        f >> data;
        return data;
    } catch (const std::exception& e) {
        std::cerr << "Error loading roles: " << e.what() << std::endl;
        return json{{"roles", json::array()}};
    }
}

void save_roles(const json& data) {
    std::ofstream f("../config/roles.json");
    f << data.dump(4);
}

int main() {
    crow::SimpleApp app;

    // GET /roles - return all roles and permissions
    CROW_ROUTE(app, "/roles")([](){
        auto roles = load_roles();
        return crow::response(roles.dump());
    });

    // POST /roles - save roles and permissions
    CROW_ROUTE(app, "/roles").methods("POST"_method)([](const crow::request& req){
        try {
            auto data = json::parse(req.body);
            save_roles(data);
            return crow::response(200, "Roles saved");
        } catch (const std::exception& e) {
            std::cerr << "Error saving roles: " << e.what() << std::endl;
            return crow::response(400, "Invalid JSON");
        }
    });

    // Example: GET /ping
    CROW_ROUTE(app, "/ping")([](){
        return "pong";
    });

    app.port(8080).multithreaded().run();
    return 0;
}
