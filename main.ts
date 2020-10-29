
import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { dataStudents } from './dataStudents.js';

import { Student } from './student.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


let studentsTbody: HTMLElement = document.getElementById('students')!;

const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;

const inputMinBox: HTMLInputElement = <HTMLInputElement> document.getElementById("min-box")!;

const inputMaxBox: HTMLInputElement = <HTMLInputElement> document.getElementById("max-box")!;

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();

renderCoursesInTable(dataCourses);
renderStudentInfoInTable(dataStudents)

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

 
function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
    }
  }
}

/*PARTE 2*/

function renderStudentInfoInTable(students: Student[]): void {
  console.log('Desplegando Infromación del estudiante');
  students.forEach((student) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>"Código"</td>
                           <td>${student.codigo}</td>`
    coursesTbody.appendChild(trElement);
    trElement.innerHTML = `<td>"Cédula"</td>
                          <td>${student.cedula}</td>`
    coursesTbody.appendChild(trElement);
    trElement.innerHTML = `<td>"Edad"</td>
                          <td>${student.edad}</td>`
    coursesTbody.appendChild(trElement);
    trElement.innerHTML = `<td>"Direccion"</td>
                            <td>${student.direccion}</td>`
    coursesTbody.appendChild(trElement);
    trElement.innerHTML = `<td>"Telefono"</td>
                            <td>${student.telefono}</td>`
    coursesTbody.appendChild(trElement);
  });
}

function clearStudentInfoInTable() {
  while (studentsTbody.hasChildNodes()) {
    if (studentsTbody.firstChild != null) {
      studentsTbody.removeChild(studentsTbody.firstChild);
    }
  }
}


function searchCourseByCredits(min: number, max: number, courses: Course[]) {
  return courses.filter( c => min < c.credits  && c.credits < max);
}

function applyFilterByCredits() { 
  let min = Number(inputMinBox.value);
  let max = Number(inputMaxBox.value);
  min = (min == null) ? -1 : min;
  max = (max == null) ? -1 : max;
  clearStudentInfoInTable();
  let coursesFiltered: Course[] = searchCourseByCredits(min, max, dataCourses);
  renderCoursesInTable(coursesFiltered);
}
