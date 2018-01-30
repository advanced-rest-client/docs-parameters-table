var DataHelper = {};
var baseUrl = location.href.substr(0, location.href.lastIndexOf('/') + 1)
  .replace('/test', '/demo');
DataHelper.initRaml = function(parser, enhancer, file, clb) {
  enhancer.addEventListener('raml-json-enhance-ready', function(e) {
    clb(e.detail.json);
  });
  parser.loadApi(baseUrl + file)
  .then(function(data) {
    enhancer.json = data.json.specification;
  })
  .catch(function(e) {
    clb(new Error('Parser error: ' + (e.message || 'Some error happened...')));
  });
};
