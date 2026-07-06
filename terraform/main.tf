provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "devops_server" {
  ami           = "ami-091138d0f0d41ff90" # Ubuntu 22.04
  instance_type = "t2.micro"
  key_name      = "aj"
  count = 5

  security_groups = ["default"]

  user_data = <<-EOF
              #!/bin/bash

              # Update packages
              apt-get update -y

              # Install basic utilities
              apt-get install -y curl wget unzip git software-properties-common

              # =========================
              # Install Docker
              # =========================
              apt-get install -y docker.io

              systemctl enable docker
              systemctl start docker

              usermod -aG docker ubuntu

              # =========================
              # Install Ansible
              # =========================
              add-apt-repository --yes --update ppa:ansible/ansible
              apt-get install -y ansible

              # =========================
              # Install Java
              # =========================
              apt-get install -y openjdk-21-jdk

              # =========================
              # Install Tomcat 10
              # =========================

              cd /opt

              wget https://archive.apache.org/dist/tomcat/tomcat-10/v10.1.41/bin/apache-tomcat-10.1.41.tar.gz

              tar -xvzf apache-tomcat-10.1.41.tar.gz

              mv apache-tomcat-10.1.41 tomcat

              chmod +x /opt/tomcat/bin/*.sh

              # Create Tomcat user
              useradd -m -U -d /opt/tomcat -s /bin/false tomcat || true

              chown -R tomcat:tomcat /opt/tomcat

              sed -i 's/port="8080"/port="8090"/' /opt/tomcat/conf/server.xml

              # Start Tomcat
              su -s /bin/bash tomcat -c "/opt/tomcat/bin/startup.sh"

              # Verify Tomcat
              sleep 10
              ss -tulpn | grep 8090

              EOF

  tags = {
    Name = "DevOps-Server"
  }
}