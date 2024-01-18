import { envs } from "./config/env.adapter"
import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"


(async () => {
  main()
})()



async function main() {
    const server = new Server(
        envs.PORT,
        AppRoutes.routes
    )

    await server.start()
}