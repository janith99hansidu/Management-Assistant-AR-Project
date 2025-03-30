package com.example.ARManagement.service;

import com.example.ARManagement.entity.Student;
import com.example.ARManagement.repository.DepartmentRepo;
import com.example.ARManagement.repository.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentRegistrationService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private DepartmentRepo departmentRepo;

    /**
     * Registers a new student.
     * Ensures that the student's GPA is set to 0 initially.
     *
     * @param student the student object from the registration request.
     * @return the saved student entity.
     */
    public Student registerStudent(Student student,String department) {
        // ensure GPA is initially 0
        student.setGpa(0.0);
        student.setDepartment(departmentRepo.findByDepartmentName(department).get());
        // save the student to the database
        return studentRepository.save(student);
    }
}