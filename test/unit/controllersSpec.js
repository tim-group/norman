'use strict';

/* jasmine specs for controllers go here */
describe('PhoneCat controllers', function() {

  describe('ReportListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('reports/reports_latest.json').
          respond([{uuid: 'FOO1'}, {uuid: 'FOO2'}]);

      scope = $rootScope.$new();
      ctrl = $controller(ReportListCtrl, {$scope: scope});
    }));


    it('should create "reports" model with 2 reports fetched from xhr', function() {
      expect(scope.reports).toBeUndefined();
      $httpBackend.flush();

      expect(scope.reports).toEqual([{name: 'FOO1'},
                                   {name: 'FOO2'}]);
    });


    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('age');
    });
  });


  describe('ReportDetailCtrl', function(){
  });
});
