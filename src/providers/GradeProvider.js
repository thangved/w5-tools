import { createContext, useEffect, useState } from "react"

export const Grade = createContext({
    courses: [
        {
            key: '',
            name: '',
            digit: 0,
            txt: '',
            four: 0,
        }
    ],
    avg: 0,
    addCourses: Function,
    removeCourses: Function,
});

const GradeProvider = ({ children }) => {
    const [courses, setCourses] = useState(JSON.parse(localStorage.getItem('courses') || '[]'));
    const [avg, setAvg] = useState(0);

    const addCourses = (course) => setCourses(prev => [...prev.filter(e => e.key !== course.key), course]);
    const removeCourses = (keys = []) => {
        keys.forEach(key => {
            setCourses(prev => prev.filter(e => e.key !== key));
        })
    }

    useEffect(() => {
        localStorage.setItem('courses', JSON.stringify(courses));
        let weights = 0;
        let sum = 0;
        courses.forEach(e => {
            weights += Number(e.weight);
            sum += e.four * Number(e.weight);
        });

        if (weights === 0)
            return setAvg(0);

        let avg = `${sum / weights}`;
        avg = avg.split('.');
        avg[1] = avg[1]?.slice(0, 2) || 0;
        avg = avg.join('.');

        if (weights !== 0)
            setAvg(avg);
    }, [courses])

    return (
        <Grade.Provider value={{
            courses,
            avg,
            addCourses,
            removeCourses,
        }}>
            {children}
        </Grade.Provider>
    )
}

export default GradeProvider
