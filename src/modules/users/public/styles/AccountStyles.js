import styled from "styled-components";



// Genel Wrapper
export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;  // Sabit background rengi
  color: #333;  // Sabit text rengi
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

// Başlık
export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #0a0a0a;  // Sabit başlık rengi
`;

// Form Elemanları
export const Form = styled.form`
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
`;

export const Label = styled.label`
  font-size: 1rem;
  color: #333;  // Sabit text rengi
  margin-bottom: 8px;
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ddd;  // Sabit border rengi
  border-radius: 8px;
  font-size: 1rem;
  color: #333;  // Sabit text rengi
  background-color: #f9f9f9;  // Sabit input background rengi
  &:focus {
    border-color: #00FFF7;  // Sabit primary color
    outline: none;
  }
`;

export const Button = styled.button`
  background-color: #00FFF7;  // Sabit primary color
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  width: 100%;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #00acc1;  // Sabit hover color
  }

  &:disabled {
    background-color: #cccccc;  // Sabit disabled color
    cursor: not-allowed;
  }
`;

// Hata Mesajları
export const ErrorMessage = styled.div`
  color: #EF4444;  // Sabit danger rengi
  font-size: 1rem;
  margin-top: 8px;
`;

// Diğer Bileşenler İçin Özelleştirilmiş Stiller
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

// Listeler ve Düğmeler
export const AddressList = styled.ul`
  width: 100%;
  padding: 0;
  list-style: none;
`;

export const AddressItem = styled.li`
  background-color: #ffffff;  // Sabit card background rengi
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
`;

export const AddressText = styled.p`
  font-size: 1rem;
  color: #333;  // Sabit text rengi
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-start;
`;

// Social Links Form
export const SocialLinksFormWrapper = styled.div`
  margin-bottom: 24px;
`;

// User Bilgisi (UserInfo)
export const UserInfo = styled.div`
  font-size: 1rem;
  color: #333;  // Sabit text rengi
  margin-top: 8px;
  font-weight: 600;

  strong {
    font-weight: bold;
  }
`;

// Açıklamalar (Description)
export const Description = styled.p`
  font-size: 1rem;
  color: #888;  // Sabit muted text rengi
  margin-top: 8px;
  line-height: 1.6;
`;

// Checkbox
export const Checkbox = styled.input`
  margin-right: 8px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  accent-color: #00FFF7;  // Sabit primary color
`;

// Form Grubu (FormGroup)
export const FormGroup = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  label {
    font-size: 1rem;
    color: #333;  // Sabit text rengi
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    padding: 12px;
    margin-bottom: 16px;
    border: 1px solid #ddd;  // Sabit border rengi
    border-radius: 8px;
    font-size: 1rem;
    color: #333;  // Sabit text rengi
    background-color: #f9f9f9;  // Sabit input background rengi

    &:focus {
      border-color: #00FFF7;  // Sabit primary color
      outline: none;
    }

    &:disabled {
      background-color: #cccccc;  // Sabit disabled rengi
    }
  }
`;


// Başarı ve Hata Mesajları
export const Success = styled.div`
  background-color: #10B981;  // Sabit success rengi
  color: #fff;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
`;


// Section ve Section Başlıkları
export const Section = styled.section`
  width: 100%;
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #00FFF7;  // Sabit primary color
`;


// Profil Resmi Yükleyici
export const ImagePreview = styled.img`
  width: 100%;
  height: auto;
  max-width: 150px;
  border-radius: 50%;
  margin-bottom: 16px;
`;

export const FileInput = styled.input`
  display: none;
`;

export const UploadButton = styled.button`
  background-color: #00FFF7;  // Sabit primary color
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
  &:hover {
    background-color: #00cccc;  // Sabit primary hover color
  }
`;



