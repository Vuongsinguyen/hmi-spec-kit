// Simple C++ REST API backend using Crow
#include "crow.h"
#include <fstream>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

json load_roles() {
    std::ifstream f("../config/roles.json");
    if (!f) return json{};
    json data;
    f >> data;
    return data;
}

int main() {
    crow::SimpleApp app;

    // GET /roles - return all roles and permissions
    CROW_ROUTE(app, "/roles")([](){
        auto roles = load_roles();
        return crow::response(roles.dump());
    });

    // Example: GET /ping
    CROW_ROUTE(app, "/ping")([](){
        return "pong";
    });

    app.port(8080).multithreaded().run();
    return 0;
}
