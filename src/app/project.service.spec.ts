import { ProjectService } from './project.service';
import { TestBed, inject, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ProjectService', () => {

  let injector: TestBed;
  let service: ProjectService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    }).compileComponents().then(() => {
      injector = getTestBed();
      service = injector.get(ProjectService);
      httpMock = injector.get(HttpTestingController);
    });
  }));

  afterEach(async(() => {
    // To flush any outstanding requests
    httpMock.verify();
  }));

  it('should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });

  it('testing project creation', () => {

    const projectcr8tst = {
      endDate: '2019-03-20T00:00:00.000Z',
      priority: 16,
      project: 'TIM',
      startDate: '2019-03-30T00:00:00.000Z',
      userId: '1123',
    }

    service.addProject(projectcr8tst).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'POST'
        && request.url == `${service.baseUrl}addproject`;
    }).flush(projectcr8tst);

  });

  it('testing update project', () => {

    const project = {
      endDate: '2019-03-30T00:00:00.000Z',
      priority: 2,
      project: 'DCM',
      startDate: '2019-04-10T00:00:00.000Z',
      userId: '1123',
    }

    service.updateProject(project).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'PUT'
        && request.url == `${service.baseUrl}editproject`;
    }).flush(project);

  });

  it('lets try delete project', () => {

    const projectdel = {
      projectId: '1235',
      project: 'DCM',
      startDate: '2019-03-10T00:00:00.000Z',
      endDate: '2019-03-30T00:00:00.000Z',
      priority: 23,
      userId: '9',
      tasks: 10,
      completed: 5,
    }
    service.deleteProject(projectdel).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'PUT'
        && request.url == `${service.baseUrl}deleteproject`;
    }).flush(projectdel);

  });

  it('get project id by project name', () => {

    service.getProjectByPName('TIM').subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'GET'
        && request.url == `${service.baseUrl}getprojectByPName/TIM`;
    });

  });

  it('get uniq test', () => {

    service.getProject(11).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'GET'
        && request.url == `${service.baseUrl}getproject/11`;
    });
  });

  it('get all completed tasks', () => {

    service.getCompletedTasks(3).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'GET'
        && request.url == `${service.baseUrl}getcompleted/3`;
    });
  });

  it('get all tasks for the project', () => {

    service.getTotalTasks(123).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'GET'
        && request.url == `${service.baseUrl}getProjectTasks/123`
    });

  });
});
