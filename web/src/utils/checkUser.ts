export const checkUser = (userData, ownerData, staffValues) => {
    staffValues.map((staff) => {
        if(userData.Name === staff.Name && userData.Surname === staff.Surname){
            return null;
        } else if(staff.Name === ownerData.Name && staff.Surname === ownerData.Name) {
            return null
        }
    })
    return userData;
}