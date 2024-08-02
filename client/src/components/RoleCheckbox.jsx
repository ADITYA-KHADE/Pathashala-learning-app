const RoleCheckbox = ({ onCheckboxChange, selectedRole }) => {
	return (
		<div className='flex  '>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer ${selectedRole === "student" ? "selected" : ""} `}>
					<span className='label-text text-gray-900 font-medium'>Student</span>
					<input
						type='checkbox'
						className='checkbox border-slate-900'
						checked={selectedRole === "student"}
						onChange={() => onCheckboxChange("student")}
					/>
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer  ${selectedRole === "teacher" ? "selected" : ""}`}>
					<span className='label-text text-gray-900 font-medium'>Teacher</span>
					<input
						type='checkbox'
						className='checkbox border-slate-900'
						checked={selectedRole === "teacher"}
						onChange={() => onCheckboxChange("teacher")}
					/>
				</label>
			</div>
		</div>
	);
};
export default RoleCheckbox;
