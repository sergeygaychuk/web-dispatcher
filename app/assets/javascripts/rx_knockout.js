Rx.Observable.fromWebSocket = function(chann, name) {
  return Rx.Observable.create(function(observer){
    function handler() {
      observer.onNext(arguments);
    };
    chann.bind(name, handler);
    return function() {};
  }).publish().refCount();
};

Rx.Observable.fromSSE = function(event_source, name) {
  return Rx.Observable.create(function(observer){
    function handler() {
      observer.onNext(arguments);
    };
    event_source.addEventListener(name, handler);
    return function(){};
  }).publish().refCount();
};

ko.subscribable.fn.toRx = function(startWithCurrentValue){
  var source = this;
  return Rx.Observable.createWithDisposable(function(observer){
    var onNext = observer.onNext.bind(observer);
    var subscription = source.subscribe(onNext);
    if (startWithCurrentValue && ko.isObservable(source))
    {
      var currentValue = source();
      if (undefined !== currentValue)
      {
        onNext(currentValue);
      }
    }
    return subscription;
  });
};

