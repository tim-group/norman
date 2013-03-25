'use strict';

/* jasmine specs for controllers go here */
describe('PhoneCat controllers', function() {

  describe('ReportListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('data/reports_latest.json').
          respond([{uuid: 'FOO1'}, {uuid: 'FOO2'}]);

      scope = $rootScope.$new();
      ctrl = $controller(ReportListCtrl, {$scope: scope});
    }));


    it('should create "reports" model with 2 reports fetched from xhr', function() {
      expect(scope.reports).toBeUndefined();
      $httpBackend.flush();

      expect(scope.reports).toEqual([{uuid: 'FOO1'},
                                   {uuid: 'FOO2'}]);
    });


    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('age');
    });
  });


  describe('ReportDetailCtrl', function(){
      var scope, ctrl, $httpBackend;

      var report = {uuid: 'FOO1', 'fields': { 'logs': [ 'line1', 'line2' ]} };

      beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('data/AAAAA-BBBBB-CCCCC-DDDDD-EEEEE.json').
            respond(report);

        $routeParams.uuid = 'AAAAA-BBBBB-CCCCC-DDDDD-EEEEE'

        scope = $rootScope.$new();
        ctrl = $controller(ReportDetailCtrl, {$scope: scope});
      }));

      it('should create "report" model with log lines in fields', function() {
          expect(scope.report).toBeUndefined();
          $httpBackend.flush();
          expect(scope.report).toEqual(report);
      })
  });
});
