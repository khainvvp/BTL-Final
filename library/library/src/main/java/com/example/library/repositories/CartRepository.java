package com.example.library.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.library.models.Book;
import com.example.library.models.Cart;


@Repository
public interface CartRepository extends JpaRepository<Cart,Long> {
	List<Cart> findByUserId(Long id);
}