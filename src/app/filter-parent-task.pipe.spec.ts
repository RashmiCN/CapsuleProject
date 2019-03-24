import { FilterParentTaskPipe } from './filter-parent-task.pipe';

describe('FilterParentTaskPipe', () => {

  const parentList = [
    {
      parentId: 12,
      parentTaskName: 'LOTR Sprint',
    },
    {
      parentId: 14,
      parentTaskName: 'GOT Sprint',
    },
    {
      parentId: 13,
      parentTaskName: 'KKC Sprint',
    },
  ];
  it('create an instance', () => {
    const pipe = new FilterParentTaskPipe();
    expect(pipe).toBeTruthy();
  });

  it('if the parent JSON is null, then return null jSoN', () => {
    const pipe = new FilterParentTaskPipe();
    expect(pipe.transform(null, 'LO')).toEqual([]);
  });


  it('if search input is null, then return full jSoN', () => {
    const pipe = new FilterParentTaskPipe();
    expect(pipe.transform(parentList, null)).toEqual(parentList);
  });

  it('happy path', () => {
    const pipe = new FilterParentTaskPipe();
    expect(pipe.transform(parentList, 'KK')).toEqual([
      {
        parentId: 13,
        parentTaskName: 'KKC Sprint',
      }
    ]);
  });
});
