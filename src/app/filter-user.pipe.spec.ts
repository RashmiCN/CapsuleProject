import { FilterUserPipe } from './filter-user.pipe';

describe('FilterUserPipe', () => {

  const users =[
    {
      userId: '1',
      firstName: 'Gandalf',
      lastName: 'Grey',
      employeeId: '12345',
      projectId: '1',
      taskId: '2',
    },
    {
      userId: '2',
      firstName: 'Frodo',
      lastName: 'Baggins',
      employeeId: '67890',
      projectId: '2',
      taskId: '1',
    },
    {
      userId: '3',
      firstName: 'Legolas',
      lastName: 'Greenleaf',
      employeeId: '12357',
      projectId: '1',
      taskId: '3',
    }
  ];

  it('create an instance', () => {
    const pipe = new FilterUserPipe(); 
    expect(pipe).toBeTruthy();
  });

  it('parents JSON passed is empty return nothing', () => {
    const pipe = new FilterUserPipe();
    expect(pipe.transform(null, 'Lego')).toEqual([]);
  });

  it('when there are projects and nothing is passed to filter it, then pass all projects', () => {
    const pipe = new FilterUserPipe();
    expect(pipe.transform(users, null)).toEqual(users);
  });

  it('when there are projects nwe want to fetch tim proj, fetch tim alone', () => {
    const pipe = new FilterUserPipe();
    expect(pipe.transform(users, 'Gandalf')).toEqual([{
      userId: '1',
      firstName: 'Gandalf',
      lastName: 'Grey',
      employeeId: '12345',
      projectId: '1',
      taskId: '2',
    }]);
  });
});
