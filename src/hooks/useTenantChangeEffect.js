// src/hooks/useTenantChangeEffect.js
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

// Slice importlarını burada merkezileştir
import { clearSettings, fetchSettings } from "@/modules/settings/slice/settingSlice";
import { clearCompany, fetchCompanyInfo } from "@/modules/company/slice/companySlice";
import { clearAdminMessages, clearSelectedModule, fetchAdminModules, fetchTenantModules } from "@/modules/adminmodules/slices/adminModuleSlice";
import { clearBikes, fetchBikes } from "@/modules/bikes/slices/bikeSlice";
import { clearCart, fetchCart } from "@/modules/cart/slice/cartSlice";
//import { clearOrders, fetchOrders } from "@/modules/order/slice/ordersSlice";
// ... diğer tenant bağlı slice’lar

export function useTenantChangeEffect() {
    const dispatch = useAppDispatch();
    const selectedTenant = useAppSelector((state) => state.tenants.selectedTenant);

    useEffect(() => {
        if (!selectedTenant) return;

        // Temizlik
        dispatch(clearSettings());
        dispatch(clearCompany());
        dispatch(clearAdminMessages());
        dispatch(clearSelectedModule());
        dispatch(clearBikes());
        dispatch(clearCart());
        // ... diğer clearlar (TEK SEFER)

        // Fetch
        dispatch(fetchSettings());
        dispatch(fetchCompanyInfo());
        dispatch(fetchAdminModules()); // Eğer "global" modülleri çekmek istiyorsan
        dispatch(fetchTenantModules(selectedTenant)); // Sadece tenant’a özel modüller
        dispatch(fetchBikes());
        dispatch(fetchCart({ tenant: selectedTenant }));
        // ... diğer fetchler (TEK SEFER)
    }, [dispatch, selectedTenant]);
}
