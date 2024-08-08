package com.example.application.services;

import com.example.application.data.Contact;
import com.example.application.repository.ContactRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {
    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository){
        this.contactRepository = contactRepository;
    }

    public List<Contact> findAll(){
        return contactRepository.findAll();
    }

    public long count(){
        return contactRepository.count();
    }

    public void delete(Contact contact){
        contactRepository.delete(contact);
    }

    public void save(Contact contact){
        if (contact == null){
            System.err.println("Contact is null. Are you sure you have connected your form to the application");
            return;
        }
        contactRepository.save(contact);
    }
}
