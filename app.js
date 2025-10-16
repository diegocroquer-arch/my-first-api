function createApp() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use("/api", apiRouter);
  return app;
}
