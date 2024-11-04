class Admin {
  private admin_id: string;
  private admin_first_name: string;
  private admin_last_name: string;
  private admin_email: string;
  private admin_password: string;
  constructor(
    admin_id: string,
    admin_first_name: string,
    admin_last_name: string,
    admin_email: string,
    admin_password: string,
  ) {
    this.admin_id = admin_id;
    this.admin_first_name = admin_first_name;
    this.admin_last_name = admin_last_name;
    this.admin_email = admin_email;
    this.admin_password = admin_password;
  }
  getAdminInfo() {
    return {
      admin_id: this.admin_id,
      admin_first_name: this.admin_first_name,
      admin_last_name: this.admin_last_name,
      admin_email: this.admin_email,
    };
  }
}
export { Admin };
