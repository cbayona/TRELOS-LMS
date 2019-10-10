const router = require('express').Router()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Course = require('../models/courses')
const Institute = require('../models/institute')
const Student = require('../models/students')
const Teacher = require('../models/teachers')
const Parent = require('../models/parent')
const Event = require('../models/event')
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

//get routes starts from here---------
router.get('/',(req,res)=> {
    res.status(200).json('This is the admins page')
}) 

router.get('/institutes',(req,res)=> {
    Institute.find().then((institutes)=>{
        res.status(200).json(institutes)
    }).catch((err)=> {
        res.status(400).json(err)
    })
})

router.get('/institute/:institute_id/students' , (req,res)=> {
      Student.find({institute_id:req.params.institute_id})
      .then(students=> res.status(200).json(students))
      .catch(err=> res.status(400).json(err))
})



router.get('/institute/:institute_id/courses' , (req,res)=> {
    Course.find({institute_id:req.params.institute_id})
    .then(courses=> res.status(200).json(courses))
    .catch(err=> res.status(400).json(err))
})



router.get('/institute/:institute_id/teachers' , (req,res)=> {
    Teacher.find({institute_id:req.params.institute_id})
    .then(teachers=> res.status(200).json(teachers))
    .catch(err=> res.status(400).json(err))
})


router.get('/institute/:institute_id/parents' , (req,res)=> {
    Parent.find({institute_id:req.params.institute_id})
    .then(parents=> res.status(200).json(parents))
    .catch(err=> res.status(400).json(err))
})


//post methods starts from here=------------
//-----------------add institute------------------//
router.post('/addinstitute' , (req,res)=> {
    console.log(req.body)
     const newInstitute = {
         instituteName: req.body.instituteName,
         instituteType: req.body.instituteType,
         institute_id: req.body.institute_id,
         email:req.body.email,
         phone:req.body.phone,
         dateTime:Date.now()
     }
     new Institute(newInstitute).save()
     .then((instituteSaved) => {
         res.status(200).json(instituteSaved)
     })
     .catch((err)=> res.status(400).json(err))
})
//------------------add course--------------------//
router.post('/addcourse' , (req,res)=> {
  console.log(req.body)
  const newCourse = {
      course_id: req.body.course_id,
      institute_id : req.body.institute_id,
      course_name : req.body.course_name,
      classs : req.body.class,
      course_desc : req.body.course_desc
  }
  new Course(newCourse).save()
  .then((newcourse) => {
       res.status(200).json(newcourse)
  })
  .catch((err) => {
           res.status(400).json(err)
  })
})

//--------------add student route---------------//
router.post('/addstudent' , (req,res)=> {
     console.log(req.body)
     const newStudent = {
         user_id:req.body.user_id,
         student_id:req.body.student_id,
         institute_id:req.body.institute_id,
         name:req.body.name,
         phone:req.body.phone,
         email:req.body.email,
         profile:req.body.profile,
         classs:req.body.class,
         courses:req.body.courses
     }
     new Student(newStudent).save()
     .then((newstudent) => {
               res.status(200).json(newstudent)
     }).catch((err) => {
               res.status(400).json(err)
     })
})

// add teacher route ---------------//
router.post('/addteacher' , (req,res) => {
        console.log(req.body)
        const newTeacher = {
         user_id:req.body.user_id,
         teacher_id:req.body.student_id,
         institute_id:req.body.institute_id,
         name:req.body.name,
         phone:req.body.phone,
         email:req.body.email,
         type:req.body.type
        }
     new Teacher(newTeacher).save()
     .then((newteacher) => {
          res.status(200).json(newteacher)
     })
     .catch((err) => {
           res.status(400).json(err)
     })
})
//----------add parents route-----------------//
router.post('/addparent' , (req,res) => {
    const newParent = {
        user_id:req.body.user_id,
        parent_id:req.body.parent_id,
        institute_id:req.body.institute_id,
        student_id:req.body.student_id,
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        profile:req.body.profile
        
    }
    new Parent(newParent).save().then((newparent)=> {
         res.status(200).json(newparent)
    }).catch((err)=> {
        res.status(400).json(err)
    })
})
//--------------add event route------------------//
router.post('/addevent' , (req,res)=> {
     console.log(req.body)
     const newEvent = {
         event_type:req.body.event_type,
         event_title:req.body.event_title,
         startdate:req.body.startdate,
         enddate:req.body.enddate,
         color:req.body.color
     }
     new Event(newEvent).save()
     .then((newevent) => {
            res.status(200).json(newevent)
     }).catch((err) => {
           res.status(400).json(err)
     })
})
//-----------------add circular route---------------------//
router.post('/addcircular' , (req,res) => {
   console.log(req.body)
   const newCircular = {
    institute_id:req.body.institute_id,
    title:req.body.title,
    text:req.body.text,
    startDate:req.body.startDate,
    endDate:req.body.endDate,
    chapterDescription:req.body.desc,
    color:req.body.color
}
new Circular(newCircular).save().then((newcircular)=> {
    res.status(200).json(newcircular)
}).catch((err)=> res.status(400).json(err))
})
//put routes start from here----------------------

//-------------edit institute route-----------------//
router.put('/:instituteid' , (req,res)=> {
    Institute.findOne({
        _id: req.params.instituteid
      })
      .then(institute=> {
        institute.instituteName= req.body.instituteName,
        institute.instituteType= req.body.instituteType,
        institute.institute_id= req.body.institute_id,
        institute.email=req.body.email,
        institute.phone=req.body.phone,
        institute.dateTime=Date.now()
        institute.save()
        .then(institute=> {
            console.log(institute)
            res.status(200).json(institute)
        })
      })
      .catch(err=> res.status(400).json(err))
      .catch(err=> res.status(400).json(err))
})
//-----------------edit ocurse route-----------------//
router.put('/:courseid' , (req,res)=> {
       Course.findOne({_id:req.params.courseid})
       .then((course) => {
        course.course_id= req.body.course_id,
        course.institute_id = req.body.institute_id,
        course.course_name = req.body.course_name,
        course.classs = req.body.class,
        course.course_desc = req.body.course_desc
        course.save()
        .then((editedcourse) => {
              res.status(200).json(editedcourse)
        })
        .catch((err) => {
            res.status(400).json({msg:"error occured"})
        })
       }).catch((err) => {
           res.status(404).json({msg:'no couse found!!'})
       })
})

//edit route for student--------------//
router.put('/:studentid' , (req,res)=> {
        Student.findOne({_id:req.params.studentid})
        .then((student) => {
            student.user_id =req.body.user_id,
            student.student_id=req.body.student_id,
            student.institute_id=req.body.institute_id,
            student.name=req.body.name,
            student.phone=req.body.phone,
            student.email=req.body.email,
            student.profile=req.body.profile,
            student.classs=req.body.class,
            student.courses=req.body.courses
            student.save()
            .then((editedstudent) => {
              res.status(200).json(editedstudent)
            })
            .catch((err) => {
              res.status(400).json(err)
            })
        })
        .catch((err) => {
           res.status(404).json(err)
        })
})
//edit route for teacher--------------//
router.put('/:teacherid' , (req,res) => {
      Teacher.findOne({_id:req.params.teacherid})
      .then((teacher) => {
        teacher.user_id=req.body.user_id,
        teacher.teacher_id=req.body.student_id,
        teacher.institute_id=req.body.institute_id,
        teacher.name=req.body.name,
        teacher.phone=req.body.phone,
        teacher.email=req.body.email,
        teacher.type=req.body.type
        teacher.save()
        .then((editedteacher) => {
             res.status(200).json(editedteacher)
        })
        .catch((err) => {
             res.status(400).json({msg:'error has occured!!'})
        })
      })
      .catch((err) => {
         res.status(404).json(err)
      })
})

//edit route for parent---------//
router.put('/:parentid' , (req,res) => {
     Parent.findOne({_id:req.params.id})
     .then((parent) => {
        parent.user_id=req.body.user_id,
        parent.parent_id=req.body.parent_id,
        parent.institute_id=req.body.institute_id,
        parent.student_id=req.body.student_id,
        parent.name=req.body.name,
        parent.phone=req.body.phone,
        parent.email=req.body.email,
        parent.profile=req.body.profile
        parent.save()
        .then((editedparent) => {
            res.status(200).json(editedparent)
        }).catch((err) => {
             res.status(400).json(err)
        })
     })
     .catch((err) => {
         res.status(404).json({msg:'not found!!'})
     })
})

//edit route for event----------------//
router.put('/:eventid' , (req,res)=> {
       Event.findOne({_id:req.params.eventid})
       .then((event) => {
        event.event_type=req.body.event_type,
        event.event_title=req.body.event_title,
        event.startdate=req.body.startdate,
        event.enddate=req.body.enddate,
        event.color=req.body.color
        event.save()
        .then((editedevent) => {
              res.status(200).json(editedevent)
        })
        .catch((err) => {
           res.status(400).json(err)
        })
       }).catch((err) => {
           res.status(404).json(err)
       })
})

//edit route for circular
router.put('/:circularid' , (req,res) => {
      Circular.findOne({_id:req.params.circularid})
      .then((circular) => {
        circular.institute_id=req.body.institute_id,
        circular.title=req.body.title,
        circular.text=req.body.text,
        circular.startDate=req.body.startDate,
        circular.endDate=req.body.endDate,
        circular.chapterDescription=req.body.desc,
        circular.color=req.body.color
        circular.save()
        .then(editedcircular => res.status(200).json(editedcircular))
        .catch(err => res.status(400).json(err))
      })
      .catch((err) => {
             res.status(404).json(err)
      })
})

//-----------delete institute------------------//
router.delete('/:id' , (req,res) => {
    Institute.deleteOne({
      _id:req.params.id
    })
    .then(() => {
      res.redirect('/')
    })
    .catch((err)=> {
            res.status(400).json(err)
    })
  })
  

module.exports = router