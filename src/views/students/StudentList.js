import React, { useEffect, useState } from "react";
import { 
    CContainer, 
    CRow, 
    CCol, 
    CCard, 
    CTable, 
    CCardBody,
    CCardHeader, 
    CTableHead, 
    CTableHeaderCell, 
    CTableRow, 
    CTableBody, 
    CTableDataCell, 
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CButton } from "@coreui/react";
 
const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false)
    const [studentToDelete, setStudentToDelete] = useState(null)
 
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch('http://localhost:8080/students?page=0', {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token,
                    }
                })
                const data = await response.json();
                setStudents(data)
            } catch (error) {
                console.error('Failed to fetch students', error)
 
            }
        }
        fetchStudents()
    }, [])

    const handleDelete = async (id) => {
        if (!studentToDelete) return
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`http://localhost:8080/students?id=${studentToDelete.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                },
            })
            if (response.status === 200) {
                setStudents(students.filter((student) => student.id !== studentToDelete.id))
                setDeleteModal(false)
                setStudentToDelete(null)
            }
        } catch (error) {
            console.error('Failed to delete student', error)
 
        }
    }

    const confirmDelete = (student) => {
        setStudentToDelete(student)
        setDeleteModal(true)
      }
 
    return (
        <CContainer>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Student List
                        </CCardHeader>
                        <CCardBody>
                            <CTable>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell>ID</CTableHeaderCell>
                                        <CTableHeaderCell>First Name</CTableHeaderCell>
                                        <CTableHeaderCell>Last Name</CTableHeaderCell>
                                        <CTableHeaderCell>Age</CTableHeaderCell>
                                        <CTableHeaderCell>Major</CTableHeaderCell>
                                        <CTableHeaderCell>GPA</CTableHeaderCell>
                                        <CTableHeaderCell>Actions</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {students.map((student) => (
                                        <CTableRow key={student.id}>
                                            <CTableDataCell>{student.id}</CTableDataCell>
                                            <CTableDataCell>{student.firstName}</CTableDataCell>
                                            <CTableDataCell>{student.lastName}</CTableDataCell>
                                            <CTableDataCell>{student.age}</CTableDataCell>
                                            <CTableDataCell>{student.major}</CTableDataCell>
                                            <CTableDataCell>{student.gpa}</CTableDataCell>
                                            <CTableDataCell>
                                            <CButton color="danger" onClick={() => confirmDelete(student)}>
                                             Delete
                                            </CButton> 
                                            </CTableDataCell>
                                                
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CModal visible={deleteModal} onClose={() => setDeleteModal(false)}>
        <CModalHeader>Confirm Delete</CModalHeader>
        <CModalBody>Are you sure you want to delete this student?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDeleteModal(false)}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={handleDelete}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
        </CContainer>
    )
}
 
export default StudentList
 