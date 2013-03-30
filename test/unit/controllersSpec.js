'use strict';

/* jasmine specs for controllers go here */
describe('Norman controllers', function() {

    var all_reports = [
            {
                '@uuid': 'FOO1',
                '@fields': {
                    'metrics': {
                        'resources': {
                            'Failed': 0
                        },
                        'events': {
                            'Noop': 0
                        }
                    }
                }
            },
            {
                '@uuid': 'FOO2',
                '@fields': {
                    'metrics': {
                        'resources': {
                            'Failed': 0
                        },
                        'events': {
                            'Noop': 0
                        }
                    }
                }
            }
          ];

    var all_reports_cleaned = [];
    all_reports.forEach(function (report) {
        var n = angular.fromJson(angular.toJson(report));
        n['uuid'] = n['@uuid'];
        n['fields'] = n['@fields'];
        delete(n['@uuid']);
        delete(n['@fields']);
        n['iconFailures'] = 'icon-ok';
        n['iconChanges'] = 'icon-exclamation-sign';
        n['hadChanges'] = 'hadChanges';
        all_reports_cleaned.push(n);
    });

  describe('ReportListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
//      $httpBackend.expectPOST('/add-msg.py', 'message content').respond(201, '');
      $httpBackend.expectGET('data/reports_latest.json').
          respond(all_reports);

      scope = $rootScope.$new();
      ctrl = $controller(ReportListCtrl, {$scope: scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should create "reports" model with 2 reports fetched from xhr', function() {
      expect(scope.reports).toBeUndefined();
      $httpBackend.flush();

      expect(scope.reports).toEqual(all_reports_cleaned);
    });


    it('should set the default value of orderProp model', function() {
      $httpBackend.flush();
      expect(scope.orderProp).toBe('-timestamp');
    });
  });


  describe('ReportDetailCtrl', function(){
      var scope, ctrl, $httpBackend;

      var report = all_reports[0]

      beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('data/AAAAA-BBBBB-CCCCC-DDDDD-EEEEE.json').
            respond(report);

        $routeParams.uuid = 'AAAAA-BBBBB-CCCCC-DDDDD-EEEEE'

        scope = $rootScope.$new();
        ctrl = $controller(ReportDetailCtrl, {$scope: scope});
      }));

      afterEach(function() {
          $httpBackend.verifyNoOutstandingExpectation();
          $httpBackend.verifyNoOutstandingRequest();
      });

      it('should create "report" model with log lines in fields', function() {
          expect(scope.report).toBeUndefined();
          $httpBackend.flush();
          expect(scope.report).toEqual(all_reports_cleaned[0]);
      })
  });
});

