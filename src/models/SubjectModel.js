import AbstractModel from "./AbstractModel";

class SubjectModel extends AbstractModel {
  async fetchSubjectList(pid) {
    const result = await super.get('/api/subject/listAll');
    return result.data;
  };
}

export default SubjectModel;
