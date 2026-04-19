// ============================================
// HIGH GRADE MONTESSORI REPORT CARD GENERATOR
// Complete Working Version - ALL FUNCTIONALITIES
// ============================================

// ===== GRADE UTILITIES =====
function getGradeLetter(score) {
    if(score >= 80) return 'A';
    if(score >= 70) return 'B';
    if(score >= 60) return 'C';
    if(score >= 50) return 'D';
    return 'F';
}

function getGradeDescription(letter) {
    const descriptions = {
        'A': 'Excellent',
        'B': 'Very Good',
        'C': 'Good',
        'D': 'Satisfactory',
        'F': 'Needs Improvement'
    };
    return descriptions[letter] || '';
}

function getGradeColor(letter) {
    const colors = {
        'A': '#4CAF50',
        'B': '#FFD700',
        'C': '#2196F3',
        'D': '#FF9800',
        'F': '#F44336'
    };
    return colors[letter] || '#9E9E9E';
}

// ===== COMMENT SUGGESTIONS =====
const defaultComments = [
    // Positive comments
    "Excellent performance! Keep up the great work.",
    "Outstanding academic achievement. A role model for peers.",
    "Remarkable improvement in all subjects. Very proud!",
    "Consistently demonstrates excellent behavior and focus.",
    "Shows exceptional creativity and problem-solving skills.",
    "A dedicated student with a positive attitude towards learning.",
    "Demonstrates leadership qualities and helps classmates.",
    "Excellent participation in class activities and discussions.",
    "Shows great enthusiasm for learning new concepts.",
    "Maintains high standards in all academic work.",
    "A pleasure to teach. Always eager to learn more.",
    "Exhibits strong work ethic and determination.",
    "Consistently exceeds expectations in all areas.",
    "Shows maturity beyond their years in handling challenges.",
    "An inspiration to others with their positive outlook.",
    // Slightly negative comments
    "Good progress, but needs to focus more on homework completion.",
    "Shows potential, but needs to improve time management skills.",
    "Satisfactory performance, but could participate more in class.",
    "Needs to work on consistency in academic performance.",
    "Good effort, but needs to improve organizational skills.",
    "Shows improvement, but needs to focus on weak subjects.",
    "Needs to develop better study habits for better results.",
    "Good attitude, but needs to improve concentration in class.",
    "Shows promise, but needs to put in more effort consistently.",
    "Needs to improve participation in group activities.",
    "Good foundation, but needs to build on strengths.",
    "Needs to work on completing assignments on time.",
    "Shows potential, but needs to improve self-discipline.",
    "Good progress, but needs to seek help when struggling.",
    "Needs to improve listening skills during lessons."
];

// ===== UI UTILITIES =====
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 18px;">
                ${type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️'}
            </span>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
}

function createProgressBar(score, maxScore = 100) {
    const percentage = Math.min((score / maxScore) * 100, 100);
    const percentageText = percentage.toFixed(1);
    
    return `
        <div class="score-progress" style="position: relative; width: 100%; height: 12px; background: #e0e0e0; border-radius: 6px; overflow: hidden; margin-top: 4px; margin-bottom: 4px; border: 1px solid #ccc;">
            <div class="score-progress-bar" style="height: 100%; background: linear-gradient(90deg, #2e7d32 0%, #1b5e20 100%); width: ${percentage}%; border-radius: 6px; transition: width 0.3s ease;"></div>
        </div>
        <div style="text-align: center; font-size: 11px; color: #555; margin-top: 2px; font-weight: 500;">
            ${score}/${maxScore} (${percentageText}%)
        </div>
    `;
}

function generateStatistics(subjects, results) {
    const gradeCounts = {};
    subjects.forEach(subject => {
        const grade = getGradeLetter(subject.total);
        gradeCounts[grade] = (gradeCounts[grade] || 0) + 1;
    });

    const statsHtml = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin: 25px 0; padding: 20px 0; border-top: 2px solid #2e7d32; border-bottom: 2px solid #2e7d32;">
            <div style="background: linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%); padding: 20px; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(46, 125, 50, 0.1); border: 1px solid #c8e6c9;">
                <div style="font-size: 28px; font-weight: bold; color: #2e7d32; margin-bottom: 5px;">${results.average.toFixed(1)}</div>
                <div style="font-size: 13px; color: #666; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Average Score</div>
            </div>
            <div style="background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); padding: 20px; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(255, 152, 0, 0.1); border: 1px solid #ffcc80;">
                <div style="font-size: 28px; font-weight: bold; color: #f57c00; margin-bottom: 5px;">${results.gradeLetter}</div>
                <div style="font-size: 13px; color: #666; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Overall Grade</div>
            </div>
            <div style="background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); padding: 20px; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(37, 99, 235, 0.1); border: 1px solid #bbdefb;">
                <div style="font-size: 28px; font-weight: bold; color: #1976d2; margin-bottom: 5px;">${subjects.length}</div>
                <div style="font-size: 13px; color: #666; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Subjects</div>
            </div>
            <div style="background: linear-gradient(135deg, #f3e5f5 0%, #ede7f6 100%); padding: 20px; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(156, 39, 176, 0.1); border: 1px solid #e1bee7;">
                <div style="font-size: 28px; font-weight: bold; color: #7b1fa2; margin-bottom: 5px;">${Object.keys(gradeCounts).length}</div>
                <div style="font-size: 13px; color: #666; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Grade Types</div>
            </div>
        </div>
    `;

    return statsHtml;
}

// ===== LOGO INITIALIZATION =====
let logoBase64 = '';

function initializeLogo() {
    const img = new Image();
    img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        logoBase64 = canvas.toDataURL('image/png');
        console.log('✅ Logo loaded and embedded in memory');
    };
    img.onerror = function() {
        console.warn('⚠️ Logo file (Picture3.png) not found - reports will display without logo');
    };
    img.src = 'Picture3.png';
}

function getLogoHtml() {
    if (!logoBase64) {
        return '';
    }
    return `<img src="${logoBase64}" alt="School Logo" style="height: 70px; width: auto;">`;
}

// ===== DATA STORAGE =====
let allReports = JSON.parse(localStorage.getItem('highGradeReports')) || [];
let studentDatabase = JSON.parse(localStorage.getItem('highGradeStudents')) || [];

// ===== EVENT LISTENERS & INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeLogo();
    initializeCommentSuggestions();
    
    const teacherClassSelect = document.getElementById('teacherClass');
    if (teacherClassSelect) {
        teacherClassSelect.addEventListener('change', function() {
            updateSubjectDisplay();
            loadTeacherNameForClass();
            displaySavedReports();
        });
        updateSubjectDisplay();
        loadTeacherNameForClass();
    }

    const teacherNameInput = document.getElementById('teacherName');
    if (teacherNameInput) {
        teacherNameInput.addEventListener('input', function() {
            saveTeacherNameForClass();
            displaySavedReports();
        });
    }
    
    const studentSelect = document.getElementById('studentSelect');
    if (studentSelect) {
        studentSelect.addEventListener('change', function() {
            const selectedStudent = studentDatabase.find(s => s.id == this.value);
            if(selectedStudent) {
                document.getElementById('studentName').value = selectedStudent.name;
            }
        });
    }
    
    populateStudentSelect();
    displaySavedReports();
    
    // Search functionality
    const searchInput = document.getElementById('reportSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterReports(this.value);
        });
    }
});

// ===== SUBJECT DISPLAY CONTROL =====
function updateSubjectDisplay() {
    const teacherClass = document.getElementById('teacherClass').value;
    const studentClassInput = document.getElementById('studentClass');
    studentClassInput.value = teacherClass;
    const isJHS = teacherClass.includes('JHS');
    document.getElementById('primarySubjects').style.display = isJHS ? 'none' : 'block';
    document.getElementById('jhsSubjects').style.display = isJHS ? 'block' : 'none';
    populateStudentSelect();
}

// ===== SCORE COLLECTION =====
function getScores() {
    const isJHS = document.getElementById('teacherClass').value.includes('JHS');
    let subjects = [];

    if(isJHS) {
        const jhsSubjects = ['Maths', 'English', 'Science', 'Career Technology', 'Creative Arts & Design', 'Social Studies', 'Computing', 'RME', 'French', 'Twi'];
        const cas = document.querySelectorAll('.jhs-ca');
        const exams = document.querySelectorAll('.jhs-exam');
        jhsSubjects.forEach((subject, index) => {
            const ca = Number(cas[index]?.value) || 0;
            const exam = Number(exams[index]?.value) || 0;
            const total = ca + exam;
            subjects.push({
                name: subject,
                ca: ca,
                exam: exam,
                total: total,
                score: total
            });
        });
    } else {
        const primarySubjects = ['Maths', 'English', 'Science', 'Creative Arts', 'History', 'Computing', 'RME', 'French', 'Twi'];
        const cas = document.querySelectorAll('#subjectsContainer .subject-ca');
        const exams = document.querySelectorAll('#subjectsContainer .subject-exam');
        primarySubjects.forEach((subject, index) => {
            const ca = Number(cas[index]?.value) || 0;
            const exam = Number(exams[index]?.value) || 0;
            const total = ca + exam;
            subjects.push({
                name: subject,
                ca: ca,
                exam: exam,
                total: total,
                score: total
            });
        });
    }

    return subjects;
}

// ===== RESULTS CALCULATION =====
function calculateResults(subjects) {
    const totalScore = subjects.reduce((sum, s) => sum + s.total, 0);
    const maxPossibleScore = subjects.length * 100;
    const overallPercentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
    const average = subjects.length > 0 ? totalScore / subjects.length : 0;
    const classAssessmentAvg = subjects.reduce((sum, s) => sum + s.ca, 0) / subjects.length;
    const examScoreAvg = subjects.reduce((sum, s) => sum + s.exam, 0) / subjects.length;
    const weightedTotal = (classAssessmentAvg * 0.5 + examScoreAvg * 0.5);
    const gradeLetter = getGradeLetter(overallPercentage);
    const gradeDescription = getGradeDescription(gradeLetter);

    return {
        total: totalScore,
        average: average,
        classAssessmentAvg: classAssessmentAvg,
        examScoreAvg: examScoreAvg,
        weightedTotal: weightedTotal,
        gradeLetter: gradeLetter,
        gradeDescription: gradeDescription,
        overallPercentage: overallPercentage
    };
}

// ===== TEACHER NAME MANAGEMENT =====
function loadTeacherNameForClass() {
    const teacherClass = document.getElementById('teacherClass').value;
    const savedName = localStorage.getItem(`teacher_${teacherClass}`);
    if (savedName) {
        document.getElementById('teacherName').value = savedName;
    } else {
        document.getElementById('teacherName').value = '';
    }
}

function saveTeacherNameForClass() {
    const teacherClass = document.getElementById('teacherClass').value;
    const teacherName = document.getElementById('teacherName').value.trim();
    if (teacherName) {
        localStorage.setItem(`teacher_${teacherClass}`, teacherName);
    }
}

function saveTeacherNameForClass() {
    const teacherClass = document.getElementById('teacherClass').value;
    const teacherName = document.getElementById('teacherName').value.trim();
    if (teacherName) {
        localStorage.setItem(`teacher_${teacherClass}`, teacherName);
    }
}

// ===== COMMENT MANAGEMENT =====
function initializeCommentSuggestions() {
    const select = document.getElementById('commentSuggestions');
    const textarea = document.getElementById('teacherComments');
    
    // Load custom comments from localStorage
    let customComments = JSON.parse(localStorage.getItem('customComments') || '[]');
    
    // Clear existing options except the first
    select.innerHTML = '<option value="">-- Select a comment suggestion --</option>';
    
    // Add default comments
    defaultComments.forEach(comment => {
        const option = document.createElement('option');
        option.value = comment;
        option.textContent = comment;
        select.appendChild(option);
    });
    
    // Add custom comments
    customComments.forEach(comment => {
        const option = document.createElement('option');
        option.value = comment;
        option.textContent = comment + ' (Custom)';
        select.appendChild(option);
    });
    
    // Handle selection
    select.addEventListener('change', function() {
        if (this.value) {
            textarea.value = this.value;
        }
    });
    
    // Save custom comments when textarea changes
    textarea.addEventListener('input', function() {
        const comment = this.value.trim();
        if (comment && !defaultComments.includes(comment) && !customComments.includes(comment)) {
            customComments.push(comment);
            localStorage.setItem('customComments', JSON.stringify(customComments));
            // Re-initialize to update the dropdown
            initializeCommentSuggestions();
        }
    });
}

// ===== REPORT FILTERING =====
function getTeacherContextReports() {
    const teacherName = document.getElementById('teacherName')?.value.trim();
    const teacherClass = document.getElementById('teacherClass')?.value.trim();
    if (!teacherName) {
        return allReports;
    }
    return allReports.filter(report => {
        const sameTeacher = report.teacherName?.trim().toLowerCase() === teacherName.toLowerCase();
        if (teacherClass) {
            return sameTeacher && report.studentClass?.trim().toLowerCase() === teacherClass.toLowerCase();
        }
        return sameTeacher;
    });
}

// ===== REPORT HTML GENERATION =====
function buildReportHtml(report) {
    const results = calculateResults(report.subjects);
    const { average, gradeLetter, gradeDescription } = results;
    let reportHtml = `
        <div class="report-card" id="reportCard" style="background: white; padding: 15px; border-radius: 10px; margin-top: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); font-family: Arial, sans-serif; max-width: 900px; margin-left: auto; margin-right: auto; line-height: 1.5; width: 100%;">
            <div style="text-align: center; border-bottom: 2px solid #2e7d32; margin-bottom: 8px; padding-bottom: 8px;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 6px;">
                    ${getLogoHtml()}
                    <div>
                        <h2 style="color: #2e7d32; margin: 0; font-size: 18px;">HIGH GRADE MONTESSORI SCHOOL</h2>
                        <div style="font-style: italic; color: #DAA520; font-size: 11px;">\"Nothing But The Best!\"</div>
                    </div>
                </div>
                <p style="font-size: 8px; margin: 2px 0;">House No. 111, Bia Street, New Ashongman Estate | P.O. Box 3981, Kaneshie, Accra | 📞 +233 2775 87829</p>
                <h3 style="margin: 6px 0 0; color: #333; font-size: 14px;">ACADEMIC REPORT CARD</h3>
            </div>
            <div style="background: #f8f9fa; padding: 10px; border-radius: 7px; margin: 10px 0; display: grid; grid-template-columns: repeat(4, minmax(180px, 1fr)); gap: 10px; font-size: 10px;">
                <div><strong>Name:</strong> ${report.studentName}</div>
                <div><strong>Class:</strong> ${report.studentClass}</div>
                <div><strong>Term:</strong> ${report.trimester}</div>
                <div><strong>Year:</strong> ${report.academicYear}</div>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 10px;">
                <thead>
                    <tr style="background: #2e7d32; color: white;">
                        <th style="padding: 8px 6px; text-align: left; border: 1px solid #ddd; font-size: 9px;">Subject</th>
                        <th style="padding: 8px 6px; text-align: center; border: 1px solid #ddd; font-size: 9px;">CA</th>
                        <th style="padding: 8px 6px; text-align: center; border: 1px solid #ddd; font-size: 9px;">Exam</th>
                        <th style="padding: 8px 6px; text-align: center; border: 1px solid #ddd; font-size: 9px;">Total</th>
                        <th style="padding: 8px 6px; text-align: center; border: 1px solid #ddd; font-size: 9px;">Grade</th>
                        <th style="padding: 8px 6px; text-align: left; border: 1px solid #ddd; font-size: 9px;">Remark</th>
                    </tr>
                </thead>
                <tbody>`;

    report.subjects.forEach(subject => {
        const grade = getGradeLetter(subject.total);
        const gradeColor = getGradeColor(grade);
        const remark = getGradeDescription(grade);
        reportHtml += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 6px 4px; border: 1px solid #ddd; font-weight: 600; font-size: 9px;">${subject.name}</td>
                <td style="padding: 6px 4px; border: 1px solid #ddd; text-align: center; font-weight: 600; font-size: 9px;">${subject.ca}</td>
                <td style="padding: 6px 4px; border: 1px solid #ddd; text-align: center; font-weight: 600; font-size: 9px;">${subject.exam}</td>
                <td style="padding: 6px 4px; border: 1px solid #ddd; text-align: center; font-weight: bold; font-size: 9px;">${subject.total}</td>
                <td style="padding: 6px 4px; border: 1px solid #ddd; text-align: center;"><span style="background: ${gradeColor}; color: white; padding: 3px 6px; border-radius: 10px; font-weight: bold; font-size: 8px;">${grade}</span></td>
                <td style="padding: 6px 4px; border: 1px solid #ddd; font-size: 9px;">${remark}</td>
            </tr>`;
    });

    reportHtml += `
                </tbody>
                <tfoot>
                    <tr style="background: #f0f0f0; font-weight: bold;">
                        <td colspan="2" style="padding: 6px 4px; border: 1px solid #ddd; font-size: 9px;">Overall Average</td>
                        <td colspan="4" style="padding: 6px 4px; border: 1px solid #ddd; text-align: center; font-size: 9px;">${average.toFixed(1)}% - ${gradeLetter} (${gradeDescription})</td>
                    </tr>
                </tfoot>
            </table>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 6px 0; font-size: 9px;">
                <div style="background: #f8f9fa; padding: 6px; border-radius: 5px; border-left: 2px solid #2e7d32;"><strong>Attitude:</strong> ${report.attitude}</div>
                <div style="background: #fff8e1; padding: 6px; border-radius: 5px; border-left: 2px solid #ff9800;"><strong>Grade:</strong> ${gradeLetter} - ${gradeDescription}</div>
            </div>
            <div style="background: #f8f9fa; padding: 6px; border-radius: 5px; margin: 6px 0; font-size: 9px; border-left: 2px solid #DAA520;"><strong>Comments:</strong> "${report.teacherComments}"</div>
            <div style="display: flex; justify-content: space-between; margin-top: 12px; padding-top: 12px; border-top: 1px solid #ddd; font-size: 10px;">
                <div style="text-align: center; width: 45%;"><div style="border-top: 1px solid #333; padding-top: 5px; margin-top: 9px; font-size: 9px;">${report.teacherName}</div><div style="font-weight: bold; margin-top: 4px;">Teacher</div></div>
                <div style="text-align: center; width: 45%;"><div style="border-top: 1px solid #333; padding-top: 5px; margin-top: 9px; font-size: 9px;">_________________</div><div style="font-weight: bold; margin-top: 4px;">Principal</div></div>
            </div>
            <div style="text-align: center; margin-top: 9px; font-size: 8px; color: #666; border-top: 1px solid #ddd; padding-top: 7px;"><p style="margin: 2px 0;">Generated: ${new Date().toLocaleDateString()} | High Grade Montessori - \"Nothing But The Best!\"</p></div>
        </div>`;
    return reportHtml;
}

// ===== REPORT GENERATION & DISPLAY =====
function generateReport() {
    const studentName = document.getElementById('studentName').value || 'Not Specified';
    const studentClass = document.getElementById('studentClass').value;
    const trimester = document.getElementById('trimester').value;
    const academicYear = document.getElementById('academicYear').value;
    const attitude = document.getElementById('attitude').value;
    const teacherName = document.getElementById('teacherName').value || '_________________';
    const teacherComments = document.getElementById('teacherComments').value || 'No comments provided.';
    
    const subjects = getScores();
    const results = calculateResults(subjects);
    const { average, gradeLetter, gradeDescription } = results;
    
    let reportHtml = `
        <div class="report-card" id="reportCard" style="background: white; padding: 15px 15px 16px; border-radius: 10px; margin-top: 10px; box-shadow: 0 5px 14px rgba(0,0,0,0.18); font-family: Arial, sans-serif; max-width: 960px; margin-left: auto; margin-right: auto; line-height: 1.6; width: 100%;">
            <div style="text-align: center; border-bottom: 2px solid #2e7d32; margin-bottom: 10px; padding-bottom: 10px;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 8px; flex-wrap: wrap;">
                    ${getLogoHtml()}
                    <div style="max-width: 620px;">
                        <h2 style="color: #2e7d32; margin: 0; font-size: 20px; line-height: 1.05;">HIGH GRADE MONTESSORI SCHOOL</h2>
                        <div style="font-style: italic; color: #DAA520; font-size: 12px; margin-top: 3px;">"Nothing But The Best!"</div>
                    </div>
                </div>
                <p style="font-size: 9px; margin: 3px 0; letter-spacing: 0.02em;">House No. 111, Bia Street, New Ashongman Estate | P.O. Box 3981, Kaneshie, Accra | 📞 +233 2775 87829</p>
                <h3 style="margin: 7px 0 0; color: #333; font-size: 16px;">ACADEMIC REPORT CARD</h3>
            </div>
            <div style="background: #f8f9fa; padding: 9px; border-radius: 7px; margin: 10px 0; display: grid; grid-template-columns: repeat(4, minmax(180px, 1fr)); gap: 9px; font-size: 10px;">
                <div><strong>Name:</strong> ${studentName}</div>
                <div><strong>Class:</strong> ${studentClass}</div>
                <div><strong>Term:</strong> ${trimester}</div>
                <div><strong>Year:</strong> ${academicYear}</div>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 10px;">
                <thead>
                    <tr style="background: #2e7d32; color: white;">
                        <th style="padding: 8px 6px; text-align: left; border: 1px solid #ddd; font-size: 9px;">Subject</th>
                        <th style="padding: 8px 6px; text-align: center; border: 1px solid #ddd; font-size: 9px;">CA</th>
                        <th style="padding: 8px 6px; text-align: center; border: 1px solid #ddd; font-size: 9px;">Exam</th>
                        <th style="padding: 8px 6px; text-align: center; border: 1px solid #ddd; font-size: 9px;">Total</th>
                        <th style="padding: 8px 6px; text-align: center; border: 1px solid #ddd; font-size: 9px;">Grade</th>
                        <th style="padding: 8px 6px; text-align: left; border: 1px solid #ddd; font-size: 9px;">Remark</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    subjects.forEach(subject => {
        const grade = getGradeLetter(subject.total);
        const gradeColor = getGradeColor(grade);
        const remark = getGradeDescription(grade);

        reportHtml += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 7px 6px; border: 1px solid #ddd; font-weight: 600; font-size: 10px;">${subject.name}</td>
                <td style="padding: 7px 6px; border: 1px solid #ddd; text-align: center; font-weight: 600; font-size: 10px;">${subject.ca}</td>
                <td style="padding: 7px 6px; border: 1px solid #ddd; text-align: center; font-weight: 600; font-size: 10px;">${subject.exam}</td>
                <td style="padding: 7px 6px; border: 1px solid #ddd; text-align: center; font-weight: bold; font-size: 10px;">${subject.total}</td>
                <td style="padding: 7px 6px; border: 1px solid #ddd; text-align: center;"><span style="background: ${gradeColor}; color: white; padding: 4px 8px; border-radius: 11px; font-weight: bold; font-size: 9px;">${grade}</span></td>
                <td style="padding: 7px 6px; border: 1px solid #ddd; font-size: 10px;">${remark}</td>
            </tr>
        `;
    });
    
    reportHtml += `
                </tbody>
                <tfoot>
                    <tr style="background: #f0f0f0; font-weight: bold;">
                        <td colspan="2" style="padding: 8px 6px; border: 1px solid #ddd; font-size: 10px;">Overall Average</td>
                        <td colspan="4" style="padding: 8px 6px; border: 1px solid #ddd; text-align: center; font-size: 10px;">${average.toFixed(1)}% - ${gradeLetter} (${gradeDescription})</td>
                    </tr>
                </tfoot>
            </table>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 9px 0; font-size: 10px;">
                <div style="background: #f8f9fa; padding: 8px; border-radius: 6px; border-left: 2px solid #2e7d32;"><strong>Attitude:</strong> ${attitude}</div>
                <div style="background: #fff8e1; padding: 8px; border-radius: 6px; border-left: 2px solid #ff9800;"><strong>Grade:</strong> ${gradeLetter} - ${gradeDescription}</div>
            </div>
            <div style="background: #f8f9fa; padding: 8px; border-radius: 6px; margin: 9px 0; font-size: 10px; border-left: 2px solid #DAA520;"><strong>Comments:</strong> "${teacherComments}"</div>
            <div style="display: flex; justify-content: space-between; margin-top: 12px; padding-top: 12px; border-top: 1px solid #ddd; font-size: 10px;">
                <div style="text-align: center; width: 45%;">
                    <div style="border-top: 1px solid #333; padding-top: 5px; margin-top: 9px; font-size: 9px;">${teacherName}</div>
                    <div style="font-weight: bold; margin-top: 4px;">Teacher</div>
                </div>
                <div style="text-align: center; width: 45%;">
                    <div style="border-top: 1px solid #333; padding-top: 5px; margin-top: 9px; font-size: 9px;">_________________</div>
                    <div style="font-weight: bold; margin-top: 4px;">Principal</div>
                </div>
            </div>
            <div style="text-align: center; margin-top: 9px; font-size: 8px; color: #666; border-top: 1px solid #ddd; padding-top: 7px;">
                <p style="margin: 2px 0;">Generated: ${new Date().toLocaleDateString()} | High Grade Montessori - "Nothing But The Best!"</p>
            </div>
        </div>
    `;
    
    document.getElementById('reportDisplay').innerHTML = reportHtml;
    document.getElementById('reportCard').scrollIntoView({ behavior: 'smooth' });
    
    // Hide pre-generation buttons and show post-generation buttons
    document.getElementById('preGenerationButtons').style.display = 'none';
    document.getElementById('postGenerationButtons').style.display = 'flex';
    
    return true;
}

// ===== CREATE NEW REPORT =====
function createNewReport() {
    // Clear the report display
    document.getElementById('reportDisplay').innerHTML = '';
    
    // Reset form inputs
    document.getElementById('studentName').value = '';
    document.getElementById('studentClass').value = '';
    document.getElementById('trimester').value = 'Term 1';
    document.getElementById('academicYear').value = '2024/2025';
    document.getElementById('attitude').value = 'Excellent';
    document.getElementById('teacherName').value = '';
    document.getElementById('teacherComments').value = '';
    
    // Reset all subject scores for Primary
    const primarySubjectsCA = document.querySelectorAll('#primarySubjects .subject-ca');
    const primarySubjectsExam = document.querySelectorAll('#primarySubjects .subject-exam');
    primarySubjectsCA.forEach(input => input.value = '');
    primarySubjectsExam.forEach(input => input.value = '');
    
    // Reset all subject scores for JHS
    const jhsSubjectsCA = document.querySelectorAll('#jhsSubjects .jhs-ca');
    const jhsSubjectsExam = document.querySelectorAll('#jhsSubjects .jhs-exam');
    jhsSubjectsCA.forEach(input => input.value = '');
    jhsSubjectsExam.forEach(input => input.value = '');
    
    // Update student class display
    updateSubjectDisplay();
    
    // Hide post-generation buttons and show pre-generation buttons
    document.getElementById('postGenerationButtons').style.display = 'none';
    document.getElementById('preGenerationButtons').style.display = 'flex';
    
    // Clear dark mode selection on new report
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        updateDarkModeButtons();
    }
    
    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    showToast('✨ Ready to create a new report!', 'info', 2000);
}

// ===== REPORT SAVING & LOADING =====
function saveReport() {
    const studentName = document.getElementById('studentName').value;
    if(!studentName) {
        alert('Please enter student name before saving!');
        return false;
    }
    
    generateReport();
    
    const subjects = getScores();
    const results = calculateResults(subjects);
    const { average, classAssessmentAvg, examScoreAvg, weightedTotal, gradeLetter } = results;
    
    const reportData = {
        id: Date.now(),
        studentName: studentName,
        studentClass: document.getElementById('studentClass').value,
        trimester: document.getElementById('trimester').value,
        academicYear: document.getElementById('academicYear').value,
        attitude: document.getElementById('attitude').value,
        teacherName: document.getElementById('teacherName').value,
        teacherComments: document.getElementById('teacherComments').value,
        subjects: subjects,
        average: average,
        classAssessmentAvg: classAssessmentAvg,
        examScoreAvg: examScoreAvg,
        weightedTotal: weightedTotal,
        grade: gradeLetter,
        dateSaved: new Date().toISOString()
    };
    
    allReports.push(reportData);
    localStorage.setItem('highGradeReports', JSON.stringify(allReports));
    displaySavedReports();
    showToast(`✅ Report for ${studentName} saved successfully!`, 'success');
    return true;
}

function viewSavedReport(id) {
    const report = allReports.find(r => r.id === id);
    if(!report) return;
    
    document.getElementById('studentName').value = report.studentName;
    document.getElementById('teacherClass').value = report.studentClass;
    document.getElementById('studentClass').value = report.studentClass;
    document.getElementById('trimester').value = report.trimester;
    document.getElementById('academicYear').value = report.academicYear;
    document.getElementById('attitude').value = report.attitude;
    document.getElementById('teacherName').value = report.teacherName;
    document.getElementById('teacherComments').value = report.teacherComments;
    
    const isJHS = report.studentClass.includes('JHS');
    if(isJHS) {
        document.getElementById('jhsSubjects').style.display = 'block';
        document.getElementById('primarySubjects').style.display = 'none';
        const cas = document.querySelectorAll('.jhs-ca');
        const exams = document.querySelectorAll('.jhs-exam');
        report.subjects.forEach((subject, index) => {
            const ca = subject.ca !== undefined ? subject.ca : subject.score;
            const exam = subject.exam !== undefined ? subject.exam : subject.score;
            if(cas[index]) cas[index].value = ca;
            if(exams[index]) exams[index].value = exam;
        });
    } else {
        document.getElementById('primarySubjects').style.display = 'block';
        document.getElementById('jhsSubjects').style.display = 'none';
        const cas = document.querySelectorAll('#subjectsContainer .subject-ca');
        const exams = document.querySelectorAll('#subjectsContainer .subject-exam');
        report.subjects.forEach((subject, index) => {
            const ca = subject.ca !== undefined ? subject.ca : subject.score;
            const exam = subject.exam !== undefined ? subject.exam : subject.score;
            if(cas[index]) cas[index].value = ca;
            if(exams[index]) exams[index].value = exam;
        });
    }
    
    generateReport();
    showToast(`📄 Loading report for ${report.studentName}`, 'info');
}

function deleteReport(id) {
    const report = allReports.find(r => r.id === id);
    if (confirm(`Are you sure you want to delete the report for ${report.studentName}?`)) {
        allReports = allReports.filter(r => r.id !== id);
        localStorage.setItem('highGradeReports', JSON.stringify(allReports));
        displaySavedReports();
        showToast(`🗑️ Report for ${report.studentName} deleted successfully!`, 'success');
    }
}

function displaySavedReports() {
    const reports = getTeacherContextReports();
    const teacherName = document.getElementById('teacherName')?.value.trim();
    const teacherClass = document.getElementById('teacherClass')?.value.trim();

    if(reports.length === 0) {
        document.getElementById('studentList').innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <div style="font-size: 48px; margin-bottom: 20px;">📄</div>
                <p>${teacherName ? `No saved reports found for ${teacherName}${teacherClass ? ` (${teacherClass})` : ''}.` : 'No saved reports yet. Generate and save your first report!'}</p>
            </div>
        `;
        return;
    }

    let listHtml = '<div style="max-height: 500px; overflow-y: auto;">';
    reports.slice().reverse().forEach(report => {
        const gradeColor = getGradeColor(report.grade);
        listHtml += `
            <div class="report-item" style="border-left: 4px solid ${gradeColor};">
                <div style="flex: 1;">
                    <strong style="font-size: 16px; color: var(--text-dark);">${report.studentName}</strong><br>
                    <span style="color: var(--text-light); font-size: 14px;">
                        ${report.studentClass} | ${report.trimester} | Grade:
                        <span style="background: ${gradeColor}; color: white; padding: 2px 8px; border-radius: 12px; font-weight: bold;">
                            ${report.grade}
                        </span>
                    </span><br>
                    <small style="color: #999;">Saved: ${new Date(report.dateSaved).toLocaleDateString()}</small>
                </div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button onclick="viewSavedReport(${report.id})" class="btn-modern" style="padding: 8px 12px; font-size: 14px; background: var(--school-blue);">👁️ View</button>
                    <button onclick="downloadSavedReportPDF(${report.id})" class="btn-modern" style="padding: 8px 12px; font-size: 14px; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white;">📥 PDF</button>
                    <button onclick="deleteReport(${report.id})" class="btn-modern" style="padding: 8px 12px; font-size: 14px; background: var(--error);">🗑️ Delete</button>
                </div>
            </div>`;
    });
    listHtml += '</div>';

    document.getElementById('studentList').innerHTML = listHtml;
}

// ===== DOWNLOAD FUNCTIONS =====
async function downloadPDF() {
    const reportElement = document.querySelector('#reportCard');

    if (!reportElement) {
        showToast('❌ Please generate a report first! Click "Generate Report Card" button.', 'error');
        return;
    }

    const studentName = document.getElementById('studentName').value || 'Report';
    const fileName = `HighGrade_${studentName.replace(/\s+/g, '_')}_${new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`;
    showToast('⏳ Generating PDF report... Please wait', 'info', 2000);

    try {
        await exportElementAsPDF(reportElement, fileName);
        showToast(`✅ PDF report downloaded: ${fileName}`, 'success', 3000);
    } catch (error) {
        console.error('PDF generation error:', error);
        showToast('❌ Error generating PDF. Please try again.', 'error');
    }
}

async function downloadSavedReportPDF(id) {
    const report = allReports.find(r => r.id === id);
    if (!report) {
        showToast('❌ Report not found.', 'error');
        return;
    }
    const fileName = `HighGrade_${report.studentName.replace(/\s+/g, '_')}_${report.studentClass.replace(/\s+/g, '_')}_${report.trimester.replace(/\s+/g, '_')}.pdf`;
    showToast('⏳ Generating PDF report... Please wait', 'info', 2000);

    // Create HTML element from report data
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = buildReportHtml(report);
    const reportElement = tempDiv.querySelector('#reportCard');

    try {
        await exportElementAsPDF(reportElement, fileName);
        showToast(`✅ PDF report downloaded: ${fileName}`, 'success', 3000);
    } catch (error) {
        console.error('PDF generation error:', error);
        showToast('❌ Error generating PDF. Please try again.', 'error');
    }
}

async function exportElementAsPDF(reportElement, fileName) {
    if (!reportElement) {
        throw new Error('Report element not found for PDF export.');
    }

    const canvas = await window.html2canvas(reportElement, {
        scale: 4,
        useCORS: true,
        logging: false
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
    }

    pdf.save(fileName);
}

async function downloadBatchPDFs() {
    const reports = getTeacherContextReports();
    if (reports.length === 0) {
        showToast('❌ No reports available for batch PDF download.', 'error');
        return;
    }

    showToast('⏳ Generating batch PDFs... please wait', 'info', 4000);
    const zip = new JSZip();

    try {
        for (const report of reports) {
            const fileName = `HighGrade_${report.studentName.replace(/\s+/g, '_')}_${report.studentClass.replace(/\s+/g, '_')}_${report.trimester.replace(/\s+/g, '_')}.pdf`;
            
            // Create HTML element from report data
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = buildReportHtml(report);
            const reportElement = tempDiv.querySelector('#reportCard');
            
            // Generate PDF blob
            const pdfBlob = await generatePDFBlob(reportElement);
            zip.file(fileName, pdfBlob);
        }

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        saveAs(zipBlob, `HighGrade_BatchReports_${new Date().toISOString().slice(0,10)}.zip`);
        showToast('✅ Batch PDFs zip downloaded successfully!', 'success', 4000);
    } catch (error) {
        console.error('Batch PDF generation failed:', error);
        showToast('❌ Batch PDF generation failed.', 'error');
    }
}

async function generatePDFBlob(reportElement) {
    const canvas = await window.html2canvas(reportElement, {
        scale: 4,
        useCORS: true,
        logging: false
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
    }

    return pdf.output('blob');
}

// ===== DATA EXPORT/IMPORT =====
function exportAllData() {
    if (allReports.length === 0) {
        showToast('❌ No reports to export!', 'error');
        return;
    }

    const dataStr = JSON.stringify(allReports, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileName = `HighGrade_Reports_${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();

    showToast(`📊 Exported ${allReports.length} reports successfully!`, 'success');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const imported = JSON.parse(event.target.result);
                allReports = imported;
                localStorage.setItem('highGradeReports', JSON.stringify(allReports));
                displaySavedReports();
                showToast(`📥 Imported ${allReports.length} reports successfully!`, 'success');
            } catch(error) {
                showToast('❌ Error importing file. Please check the file format.', 'error');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function clearAllData() {
    if (allReports.length === 0) {
        showToast('❌ No data to clear!', 'error');
        return;
    }

    if (confirm(`Are you sure you want to delete ALL ${allReports.length} saved reports? This action cannot be undone!`)) {
        allReports = [];
        localStorage.removeItem('highGradeReports');
        displaySavedReports();
        showToast('🗑️ All data cleared successfully!', 'success');
    }
}

// ===== DARK MODE =====
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);

    // Update both pre and post generation dark mode buttons
    const buttons = [
        { btn: 'darkModeBtn', icon: 'darkModeIcon', text: 'darkModeText' },
        { btn: 'darkModeBtnPost', icon: 'darkModeIconPost', text: 'darkModeTextPost' }
    ];

    buttons.forEach(({ btn, icon, text }) => {
        const darkModeBtn = document.getElementById(btn);
        const darkModeIcon = document.getElementById(icon);
        const darkModeText = document.getElementById(text);

        if (darkModeBtn && darkModeIcon && darkModeText) {
            if (isDark) {
                darkModeIcon.textContent = '☀️';
                darkModeText.textContent = 'Light Mode';
                darkModeBtn.style.background = 'linear-gradient(135deg, #424242 0%, #616161 100%)';
            } else {
                darkModeIcon.textContent = '🌙';
                darkModeText.textContent = 'Dark Mode';
                darkModeBtn.style.background = 'var(--gradient-primary)';
            }
        }
    });

    showToast(isDark ? 'Dark mode enabled! 🌙' : 'Light mode enabled! ☀️', 'success');
}

// Load dark mode preference
if(localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    setTimeout(() => {
        const buttons = [
            { btn: 'darkModeBtn', icon: 'darkModeIcon', text: 'darkModeText' },
            { btn: 'darkModeBtnPost', icon: 'darkModeIconPost', text: 'darkModeTextPost' }
        ];

        buttons.forEach(({ btn, icon, text }) => {
            const darkModeBtn = document.getElementById(btn);
            const darkModeIcon = document.getElementById(icon);
            const darkModeText = document.getElementById(text);

            if (darkModeBtn && darkModeIcon && darkModeText) {
                darkModeIcon.textContent = '☀️';
                darkModeText.textContent = 'Light Mode';
                darkModeBtn.style.background = 'linear-gradient(135deg, #424242 0%, #616161 100%)';
            }
        });
    }, 100);
}

// ===== SEARCH & FILTER =====
function filterReports(searchTerm) {
    const reports = document.querySelectorAll('.report-item');
    const term = searchTerm.toLowerCase();

    reports.forEach(report => {
        const studentName = report.querySelector('strong').textContent.toLowerCase();
        report.style.display = studentName.includes(term) ? 'flex' : 'none';
    });
}

// ===== INPUT VALIDATION =====
document.addEventListener('input', function(e) {
    if(e.target.type === 'number' && (e.target.classList.contains('subject-ca') || e.target.classList.contains('subject-exam') || e.target.classList.contains('jhs-ca') || e.target.classList.contains('jhs-exam'))) {
        let value = Number(e.target.value);
        if(value < 0) e.target.value = 0;
        if(value > 50) e.target.value = 50;
        if(isNaN(value)) e.target.value = 0;
    }
});

// ===== STUDENT DATABASE =====
function populateStudentSelect() {
    const studentSelect = document.getElementById('studentSelect');
    if (!studentSelect) return;
    
    const currentClass = document.getElementById('teacherClass').value;
    const filtered = currentClass ? studentDatabase.filter(s => s.class === currentClass) : studentDatabase;
    
    let options = '<option value="">-- Select Student --</option>';
    filtered.forEach(student => {
        options += `<option value="${student.id}">${student.name}</option>`;
    });
    
    studentSelect.innerHTML = options;
}

function uploadStudentDatabase() {
    const fileInput = document.getElementById('studentDatabaseFile');
    const file = fileInput.files[0];
    if(!file) {
        alert('Please select an Excel file first!');
        return;
    }

    if (typeof XLSX === 'undefined') {
        alert('Excel processing library not loaded. Please refresh the page and try again.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {type: 'array'});
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            console.log('Excel data loaded:', jsonData);

            if(jsonData.length === 0) {
                alert('No data found in the Excel file. Please check that the file contains data.');
                return;
            }

            studentDatabase = jsonData.map((row, index) => ({
                id: Date.now() + index,
                name: row.Name || row.name || row['Student Name'] || row['student name'] || '',
                class: row.Class || row.class || row['Student Class'] || row['student class'] || '',
            })).filter(student => student.name && student.name.trim() !== '');

            if (studentDatabase.length === 0) {
                alert('No valid student names found in the Excel file. Please ensure the file has a "Name" or "name" column.');
                return;
            }

            localStorage.setItem('highGradeStudents', JSON.stringify(studentDatabase));
            populateStudentSelect();

            const classCounts = {};
            studentDatabase.forEach(student => {
                classCounts[student.class] = (classCounts[student.class] || 0) + 1;
            });

            let summary = `✅ Successfully loaded ${studentDatabase.length} students:\n\n`;
            Object.keys(classCounts).forEach(cls => {
                summary += `${cls}: ${classCounts[cls]} students\n`;
            });

            alert(summary);
            showToast(`✅ Uploaded ${studentDatabase.length} students!`, 'success');
        } catch(error) {
            console.error('Error reading Excel file:', error);
            alert('❌ Error reading Excel file. Please ensure it is a valid .xlsx file.');
        }
    };
    reader.readAsArrayBuffer(file);
}

function showDatabaseStatus() {
    if (studentDatabase.length === 0) {
        alert('❌ No students in database.');
        return;
    }

    const classCounts = {};
    studentDatabase.forEach(student => {
        classCounts[student.class] = (classCounts[student.class] || 0) + 1;
    });

    let summary = `📚 Student Database Status\n\nTotal Students: ${studentDatabase.length}\n\n`;
    Object.keys(classCounts).forEach(cls => {
        summary += `${cls}: ${classCounts[cls]} students\n`;
    });

    alert(summary);
    showToast(`📚 Database has ${studentDatabase.length} students`, 'info');
}

function addTestStudents() {
    const testStudents = [
        { id: 9001, name: 'John Doe', class: 'Primary 1' },
        { id: 9002, name: 'Jane Smith', class: 'Primary 2' },
        { id: 9003, name: 'Michael Johnson', class: 'JHS 1' },
        { id: 9004, name: 'Sarah Williams', class: 'JHS 2' },
        { id: 9005, name: 'David Brown', class: 'Primary 3' }
    ];

    studentDatabase = [...studentDatabase, ...testStudents];
    localStorage.setItem('highGradeStudents', JSON.stringify(studentDatabase));
    populateStudentSelect();
    showToast(`✅ Added ${testStudents.length} test students!`, 'success');
}

function clearStudentDatabase() {
    if (studentDatabase.length === 0) {
        showToast('❌ Database is already empty!', 'error');
        return;
    }

    if (confirm(`Are you sure you want to delete ALL ${studentDatabase.length} students from the database?`)) {
        studentDatabase = [];
        localStorage.removeItem('highGradeStudents');
        populateStudentSelect();
        showToast('🗑️ Student database cleared successfully!', 'success');
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        populateStudentSelect();
    });
} else {
    populateStudentSelect();
}