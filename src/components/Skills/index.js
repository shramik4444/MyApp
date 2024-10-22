import './index.css'

const Skills = props => {
  const {det} = props
  const {skillsName, skillsimageUrl} = det

  return (
    <div className="skills-cont">
      <img src={skillsimageUrl} className="skill-logo" />
      <p>{skillsName}</p>
    </div>
  )
}
export default Skills
