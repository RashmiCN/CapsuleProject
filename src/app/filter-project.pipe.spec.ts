import { FilterProjectPipe } from './filter-project.pipe';

describe('FilterProjectPipe', () => {

  const projects = [
    {
    projectId: '1123',
    project: 'MFODC',
    startDate: '03/02/2019',
    endDate: '03/30/2019',
    priority: 26,
    userId: '5813',
    tasks: 21,
    completed: 34
    },
    {
      projectId: '1234',
      project: 'DCM',
      startDate: '03/10/2019',
      endDate: '03/20/2019',
      priority: 16,
      userId: '5678',
      tasks: 10,
      completed: 34
    },
    {
      projectId: '91011',
      project: 'TIM',
      startDate: '04/02/2019',
      endDate: '05/20/2019',
      priority: 30,
      userId: '121314',
      tasks: 20,
      completed: 10
    }
  ]

  it('does it even create???', () => {
    const pipe = new FilterProjectPipe();
    expect(pipe).toBeTruthy();
  });

  it('parents JSON passed is empty return nothing', () => {
    const pipe = new FilterProjectPipe();
    expect(pipe.transform( null, 'TIM')).toEqual([]);
  });

  it('when there are projects and nothing is passed to filter it, then pass all projects', () => {
    const pipe = new FilterProjectPipe();
    expect(pipe.transform(projects, null)).toEqual(projects);
  });

  it('when there are projects nwe want to fetch tim proj, fetch tim alone', () => {
    const pipe = new FilterProjectPipe();
    expect(pipe.transform(projects, 'TIM')).toEqual([{
      projectId: '91011',
      project: 'TIM',
      startDate: '04/02/2019',
      endDate: '05/20/2019',
      priority: 30,
      userId: '121314',
      tasks: 20,
      completed: 10
    }]);
  });
});
