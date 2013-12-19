// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap
//= require websocket_rails/main
//= require knockout
//= require knockout.mapping
//= require rx
//= require rx.binding
//= require rx.jquery
//= require sammy
//= require noty/jquery.noty
//= require noty/layouts/bottom
//= require noty/themes/default
//= require_tree .

$(document).ready(function() {
  function getHtml(url) {
    return $.ajaxAsObservable({
      url: url,
      type: 'get',
      dataType: 'json',
    });
  };

  function Events() {
    var _that = this;
    this.statuses = ko.observableArray([]);
    this.current_status = ko.observable(undefined);
    this.dangers_badge = ko.observable(undefined);
    this.info_badge = ko.observable(undefined);
    this.collection = ko.observable(undefined);
    var rxCollection = this.collection.toRx(undefined);
    rxCollection.map(function(name){
      if ("dangers" == name) {
        _that.dangers_badge(undefined);
        return 0;
      } else if ("informations" == name) {
        _that.info_badge(undefined);
        return 1;
      }
      _that.dangers_badge(undefined);
      _that.info_badge(undefined);
      return undefined;
    }).subscribe(this.current_status);
    rxCollection.map(function(value) {
      var sub_path = '';
      if (value) {
        sub_path = '/' + value;
      }
      return sub_path;
    }).subscribe(function(path) {
      getHtml('/events' + path).map(function(value) {
        return value.data;
      }).subscribe(_that.statuses);
    });

    var source = new EventSource('statuses/listen');
    source.addEventListener('inserted', function(){
      console.log(arguments);
    });

    var dispatcher = new WebSocketRails(window.location.hostname + ':3001/websocket');
    var channel = dispatcher.subscribe('statuses');
    var rxWebSocket = Rx.Observable.
      fromWebSocket(channel, 'new').
      map(function(statuses){return statuses[0]});

    rxWebSocket.
      filter(function(status) {
        return status.status_type == _that.current_status() || undefined == _that.current_status();
      }).
      subscribe(function(status){
        _that.statuses.unshift(status);
      });
    //show popups
    rxWebSocket.
      subscribe(function(status) {
        noty({
          text: "Object: " + status.object + "<br />" +
                "System: " + status.system + "<br />" +
                "Process: " + status.process + "<br />" +
                "Value: " + status.current,
          type: status.status_type == 0 ? 'error' : 'information',
          layout: 'bottomRight'
        });
      });
    rxWebSocket.
      filter(function(status) {
        if (undefined == _that.current_status()) {
          return false;
        }
        return status.status_type != _that.current_status();
      }).
      subscribe(function(status) {
        var value = undefined;
        if (status.status_type == 0) {
          value = _that.dangers_badge();
          _that.dangers_badge(undefined == value ? 1 : value + 1);
        } else {
          value = _that.info_badge();
          _that.info_badge(undefined == value ? 1 : value + 1);
        }
      });

    var app = Sammy('#insert_container', function(){
      this.get('#/', function(){
        _that.collection('');
      });
      this.get('#/events/:name', function(){
        _that.collection(this.params.name);
      });
      this.get('/', function() {
        location.hash = '#/'
      });
    });
    app.run('#/');
  }

  var appVM = new Events();
  ko.applyBindings(appVM);
});

