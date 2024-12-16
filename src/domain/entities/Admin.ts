class Admin {
  private admin_id: string;
  private admin_first_name: string;
  private admin_last_name: string;
  private admin_email: string;
  private admin_password: string;
  private is_active: boolean;
  constructor(
    admin_id: string,
    admin_first_name: string,
    admin_last_name: string,
    admin_email: string,
    admin_password: string,
    is_active: boolean
  ) {
    this.admin_id = admin_id;
    this.admin_first_name = admin_first_name;
    this.admin_last_name = admin_last_name;
    this.admin_email = admin_email;
    this.admin_password = admin_password;
    this.is_active = is_active;
  }
  getAdminInfo() {
    return {
      admin_id: this.admin_id,
      admin_first_name: this.admin_first_name,
      admin_last_name: this.admin_last_name,
      admin_email: this.admin_email,
      is_active: this.is_active,
    };
  }
}
export { Admin };
