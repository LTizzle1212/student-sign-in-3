import { defineStore } from "pinia"
import { ref, computed } from 'vue'
import { mande } from 'mande'

const studentAPI = mande('api/students') 

export const useStudentStore = defineStore('students', () => {

    const sortedStudents = ref([ ]) // empty  aray
    const mostRecentStudent = ref( {} ) // empty object
    const addNewStudentErrors = ref([])

    function getAllStudents() {
        // make an API request to get all students and save in store - StudentList
        studentAPI.get().then( students => { // students is the JSON response from the API
            sortedStudents.value = students
        }).catch( err => {
            console.log(err)
        })
    }

    function addNewStudent(student) {
        // make aPI call to add new student
        // call getAllStudnets to re-request list of studneds from API server

        studentAPI.post(student).then( () => {
            getAllStudents()
        }).catch( err => {
            addNewStudentErrors.value = err.body
        })
    } // this adds the student to the end of the list 


    // this is getting the delete button working
    function deleteStudent(studentToDelete) {
        // make API request
        const deleteStudentAPI = mande(`/api/students/${studentToDelete.id}`)
        deleteStudentAPI.delete().then( () => {
            getAllStudents()
        }).catch( err => {
            console.log(err)
        })
    //     studentList.value = studentList.value.filter( (student) => {
    //         return studentToDelete != student
    //     }) // if return true it keeps the student and false gets rid of 
    //     mostRecentStudent.value = {} // reset most recent message
    }

    

    function arrivedOrLeft(student) {
        const editStudentAPI = mande(`/api/students/${student.id}`)
        editStudentAPI.patch(student).then( () => {
            getAllStudents()
        }).catch( err => {
            console.log(err)
        })
    }
    //     mostRecentStudent.value = student
    // }

    // const studentCount = computed( () => {
    //     return studentList.value.length
    // }) // thhis updated the student count

    // computed means computed property
    // const sortedStudents = computed( () => {
    //     return studentList.value.toSorted( (s1, s2) => {
    //         return s1.name.localeCompare(s2.name)
    //     })
    //) // this will sort the students in alpbetical 

    const studentCount = computed( () => {
        return sortedStudents.value.length
    })


    return {
        // reactive data
        //studentList,
        sortedStudents,
        mostRecentStudent,
        addNewStudentErrors,

        // functions 
        getAllStudents,
        addNewStudent,
        deleteStudent,
        arrivedOrLeft,

        //computed properties
        studentCount

        //if confused during lab, go through functions above
    }

})