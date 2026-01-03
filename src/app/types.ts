export type SyllabusDraft = {
    basics: {
        status: string;
        disciplineName: string
        level: string
        specialties: string[]
        programs: string[]
        semester: string
        credits: string
        controlForm: string
        language: string
        teacher_lec: string
        teacher_lab: string
        classroomUrl: string
    }
    outcomes: {
        goal: string
        subject: string
        learningOutcomes: string
        prerequisites: string
        postrequisites: string
    }
    content: {
        topics: string
        lectures: string
        labs: string
        selfStudy: string
        literature: string
    }
    assessment: {
        policy: string
        grading: string
    }
}

export const emptyDraft: SyllabusDraft = {
    basics: {
        status: "",
        disciplineName: "",
        level: "",
        specialties: [],
        programs: [],
        semester: "",
        credits: "",
        controlForm: "",
        language: "",
        teacher_lec: "",
        teacher_lab: "",
        classroomUrl: ""
    },
    outcomes: {
        goal: "",
        subject: "",
        learningOutcomes: "",
        prerequisites: "",
        postrequisites: ""
    },
    content: {
        topics: "",
        lectures: "",
        labs: "",
        selfStudy: "",
        literature: ""
    },
    assessment: {
        policy: "",
        grading: ""
    }
}
