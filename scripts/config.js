
const xhr = new XMLHttpRequest();

window.cfg = {};

const CFG_Files = [
                    ['config', '/yml?file='],
                    ['datastore','/yml?file='],
                    ['rrd', ''],
                    ['diagrams', '/yml?file=']
                  ]

function getCFG(callback){
  const numRequests = CFG_Files.length;
  let numResponses = 0;
  
  CFG_Files.forEach(function(item){
    sendRequest(item, function() {
      numResponses++;
      if (numResponses === numRequests) {
        callback();
      }
    });
  });
}

function sendRequest(item, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Antwort empfangen
      const response = xhr.responseText;
      cfg[item[0]] = JSON.parse(response);
      console.log('got this answer for: ' + item)
      callback();
    }
  };
  console.log('GET: ', item[1]   + item[0])
  xhr.open('GET', item[1] + item[0], true);
  xhr.send();
}

getCFG(function() {
  for (let key in cfg){
    console.log(key + ' -!- ', cfg[key]);
  }
  // examples to access data
  console.log((cfg['config'].pathes.ROOT_PATH));
  console.log((cfg['config'].Communication.HPCServerName));
  console.log(cfg['rrd']);
  console.log(cfg['diagrams'].primary[0]);
  console.log(cfg['diagrams'].primary[1][0]);
  console.log(cfg['diagrams'].primary[0][1]);
});
