import { TestBed, inject, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {

  let injector: TestBed;
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    }).compileComponents().then(() => {
      injector = getTestBed();
      service = injector.get(TaskService);
      httpMock = injector.get(HttpTestingController);
    });
  }));

  afterEach(async(() => {
    // To flush any outstanding requests
    httpMock.verify();
  }));

  it('should be created', () => {
    const service: TaskService = TestBed.get(TaskService);
    expect(service).toBeTruthy();
  });

  it('Lets create parent task', () => {
    const parent: any = 'testingTesting123';
    service.addParent(parent).subscribe();
    httpMock.expectOne((request) => {
      console.log(request.body);
      return request.method === 'POST'
        && request.url === `${service.baseURL}addParentTask/testingTesting123`;
    }).flush(parent);
  });

  it('lets create child task', () => {

    const taskTest = {
      parentTaskId: '123',
      projectId: '111',
      userId: '121',
      task: 'tseting child',
      startDate: '2019-03-23T00:00:00.000Z',
      endDate: '2019-04-23T00:00:00.000Z',
      priority: 10,
      status: 'NEW'
    };

    service.addTask(taskTest).subscribe();
    httpMock.expectOne((request) => {
      return request.method === 'POST'
        && request.url === `${service.baseURL}addtask`
        && request.headers.get('Content-Type') === 'application/json';
    }).flush(taskTest);

  });

  it('should be able to update task', () => {

    const edittasktest = {
      parentTaskId: '112',
      projectId: '112',
      userId: '121',
      task: 'edit task',
      startDate: '2019-03-24T00:00:00.000Z',
      endDate: '2019-03-30T00:00:00.000Z',
      priority: 30,
      status: null
    };

    service.editTask(edittasktest).subscribe();

    httpMock.expectOne((request) => {
      return request.method === 'PUT'
        && request.url === `${service.baseURL}edittask/`;
    }).flush(edittasktest);

  });

  it('abbility to mark task 1 as complete', () => {

    service.setTaskAsComplete(1).subscribe();

    httpMock.expectOne((request) => {
      return request.method === 'PUT'
        && request.url === `${service.baseURL}completeTask/1`;
    });

  });

  it('testing get all based on project passed', () => {

    service.getTasks(1123).subscribe();

    httpMock.expectOne((request) => {
      return request.method === 'GET'
        && request.url === `${service.baseURL}gettasks/1123`;
    });

  });

  it('get unique', () => {

    service.getTask(1).subscribe();

    httpMock.expectOne((request) => {
      return request.method === 'GET'
        && request.url === `${service.baseURL}gettask/1`;
    });

  });


  it('get TaskId by Parent and Project', () => {

    service.getTaskIdbyParentNProject('1-2-TIM').subscribe();

    httpMock.expectOne((request) => {
      return request.method === 'GET'
        && request.url === `${service.baseURL}getTaskbytask/1-2-TIM`;
    });

  });

  it('blindly fetch all parents', () => {

    service.getParents().subscribe();

    httpMock.expectOne((request) => {
      return request.method === 'GET'
        && request.url === `${service.baseURL}getParentTasks/`;
    });

  });
});
