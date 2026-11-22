export default function PathParameters(app) {
  app.get("/lab5/add/:a/:b", (req, res) => { res.send((parseInt(req.params.a) + parseInt(req.params.b)).toString()); });
  app.get("/lab5/subtract/:a/:b", (req, res) => { res.send((parseInt(req.params.a) - parseInt(req.params.b)).toString()); });
  app.get("/lab5/multiply/:a/:b", (req, res) => { res.send((parseInt(req.params.a) * parseInt(req.params.b)).toString()); });
  app.get("/lab5/divide/:a/:b", (req, res) => { res.send((parseInt(req.params.a) / parseInt(req.params.b)).toString()); });
}
