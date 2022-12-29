package com.example.library.models;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "carts")
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String date;
	@OneToMany(targetEntity = PurchaseProduct.class, cascade = CascadeType.ALL)
	@JoinColumn(name="cart_id", referencedColumnName = "id")
	private Collection<PurchaseProduct> orders;
	@ManyToOne(targetEntity = User.class, cascade = CascadeType.ALL)
	@JoinColumn(name="user_id", referencedColumnName = "id")
	private User user;
	public Cart(Collection<PurchaseProduct> orders, User user) {
		super();
		this.orders = orders;
		this.user = user;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public Collection<PurchaseProduct> getOrders() {
		return orders;
	}
	public void setOrders(Collection<PurchaseProduct> orders) {
		this.orders = orders;
	}
	public Cart() {
		super();
	}
	
	
}
