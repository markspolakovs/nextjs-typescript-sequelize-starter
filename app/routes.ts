import Routes from "next-routes";

const routes = new Routes();

routes.add("about")
    .add("test", "/test/:str");

export default routes;

export const Link = routes.Link;
