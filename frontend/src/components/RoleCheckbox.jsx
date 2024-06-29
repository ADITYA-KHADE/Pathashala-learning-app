const RoleCheckbox = ({ onCheckboxChange, selectedRole }) => {
	return (
		<div className='flex'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer ${selectedRole === "Student" ? "selected" : ""} `}>
					<span className='label-text'>Student</span>
					<input
						type='checkbox'
						className='checkbox border-slate-900'
						checked={selectedRole === "Student"}
						onChange={() => onCheckboxChange("Student")}
					/>
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer  ${selectedRole === "Teacher" ? "selected" : ""}`}>
					<span className='label-text'>Teacher</span>
					<input
						type='checkbox'
						className='checkbox border-slate-900'
						checked={selectedRole === "Teacher"}
						onChange={() => onCheckboxChange("Teacher")}
					/>
				</label>
			</div>
		</div>
	);
};
export default RoleCheckbox;
